export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly role: string;
}

export class UpdateUserDto {
  readonly username?: string;
  readonly password?: string;
  readonly email?: string;
  readonly role?: string;
}
