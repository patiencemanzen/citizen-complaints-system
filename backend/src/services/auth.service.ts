/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  VerifyCodeDto,
} from '../dtos/login.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/users.schema';
import { sendMail } from '../utilities/mailer';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    return this.usersService.create({ ...registerDto, role: 'PUBLIC_USER' });
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new Error('User not found');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await this.usersService.setResetCode(dto.email, code, expiry);

    await sendMail({
      to: dto.email,
      subject: 'Your Password Reset Code',
      text: `Your password reset code is: ${code}. It will expire in 15 minutes.`,
    });
  }

  async verifyCode(dto: VerifyCodeDto): Promise<void> {
    const user = await this.usersService.findByEmail(dto.email);
    if (
      !user ||
      user.resetCode !== dto.code ||
      !user.resetCodeExpiry ||
      user.resetCodeExpiry < new Date()
    ) {
      throw new Error('Invalid or expired code');
    }
    await this.usersService.resetPassword(dto.email, dto.newPassword);
  }

  async googleAuth(googleDto: {
    idToken: string;
  }): Promise<{ access_token: string }> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: googleDto.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new Error('Invalid Google token');
    }

    let user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      user = await this.usersService.create({
        email: payload.email,
        username: payload.name || payload.email.split('@')[0],
        password: '', // No password for Google users
        role: 'PUBLIC_USER',
      });
    }

    const jwtPayload = { sub: user._id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(jwtPayload) };
  }
}
