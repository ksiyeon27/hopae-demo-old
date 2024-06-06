import { IsString } from 'class-validator';

export class RequestNonceForCareerDTO {
  @IsString()
  readonly holderDid: string;
}
