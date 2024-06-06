import { IsString } from 'class-validator';

export class RequestNonceFromVerifierDTO {
  @IsString()
  readonly holderDid: string;
}
