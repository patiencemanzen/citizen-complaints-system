export class CreateAgencyDto {
  readonly name: string;
  readonly description: string;
  readonly contactEmail: string;
  readonly userPassword: string;
}

export class UpdateAgencyDto {
  readonly name?: string;
  readonly description?: string;
  readonly contactEmail?: string;
  readonly userPassword?: string;
}
