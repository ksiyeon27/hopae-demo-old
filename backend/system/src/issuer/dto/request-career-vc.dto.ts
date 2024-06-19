import { IsString } from 'class-validator';

export class RequestVcDTO {
  @IsString()
  readonly holderDid: string;
  @IsString()
  readonly encryptedNonce: string;
}
