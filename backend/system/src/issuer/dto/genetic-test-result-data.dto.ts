import { IsNumber, IsString } from 'class-validator';

export class GeneticTestResultData {
  @IsString()
  readonly did: string;
  @IsNumber()
  readonly hairLossGeneHeritability: number;
  @IsNumber()
  readonly dermatitisGeneHeritability: number;
  @IsNumber()
  readonly stomachCancerRisk: number;
  @IsNumber()
  readonly lungsCancerRisk: number;
  @IsNumber()
  readonly liverCancerRisk: number;
  @IsNumber()
  readonly pancreasCancerRisk: number;
}
