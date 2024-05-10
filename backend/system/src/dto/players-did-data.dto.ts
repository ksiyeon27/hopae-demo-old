import { IsString } from 'class-validator';

export class PlayersDidData {
  @IsString()
  readonly holder_did: string;
  @IsString()
  readonly issuer_did: string;
}
