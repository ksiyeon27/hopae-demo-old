import { IsString } from 'class-validator';

export class VerifyVpDTO {
  @IsString()
  readonly holderDid: string;
  @IsString()
  readonly vp: string;
}
