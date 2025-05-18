export class LoginDto {
  readonly email: string;
  readonly password: string;
}

export class RegisterDto {
  readonly email: string;
  readonly password: string;
  readonly username: string;
}

export class ForgotPasswordDto {
  readonly email: string;
}

export class VerifyCodeDto {
  readonly email: string;
  readonly code: string;
  readonly newPassword: string;
}
