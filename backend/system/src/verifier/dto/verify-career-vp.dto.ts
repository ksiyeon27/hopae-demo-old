import { IsString } from 'class-validator';

export class VerifyCareerVpDTO {
  @IsString()
  readonly holderDid: string;
  @IsString()
  readonly vp: string;
}
