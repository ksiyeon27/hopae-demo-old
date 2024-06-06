import { IsString } from 'class-validator';

export class PlayersDidData {
  @IsString()
  readonly holderDid: string;
  @IsString()
  readonly issuerDid: string;
}
