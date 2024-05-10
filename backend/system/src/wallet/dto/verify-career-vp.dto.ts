import { IsString } from 'class-validator';

export class VerifyCareerVpDTO {
  @IsString()
  readonly vp: string;
}
