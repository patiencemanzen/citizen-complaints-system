import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  VerifyCodeDto,
} from '../dtos/login.dto';
import { Public } from '../utilities/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('verify-code')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyCode(dto);
  }

  @Public()
  @Post('google')
  async googleAuth(@Body() googleDto: any) {
    return this.authService.googleAuth(googleDto);
  }
}
