export class CreateComplaintDto {
  readonly title: string;
  readonly description: string;
  readonly agencyId: string;
  readonly status: string;
}

export class UpdateComplaintDto {
  readonly title?: string;
  readonly description?: string;
  readonly agencyId?: string;
  readonly status?: string;
}
