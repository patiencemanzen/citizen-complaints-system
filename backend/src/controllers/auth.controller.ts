import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  VerifyCodeDto,
} from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('verify-code')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyCode(dto);
  }

  @Post('google')
  async googleAuth(@Body() googleDto: any) {
    return this.authService.googleAuth(googleDto);
  }
}
