import { IsString } from 'class-validator';

export class RequestNonceFromIssuerDTO {
  @IsString()
  readonly holderDid: string;
}
