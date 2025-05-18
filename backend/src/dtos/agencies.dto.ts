export class CreateAgencyDto {
  readonly name: string;
  readonly description: string;
  readonly contactEmail: string;
}

export class UpdateAgencyDto {
  readonly name?: string;
  readonly description?: string;
  readonly contactEmail?: string;
}
