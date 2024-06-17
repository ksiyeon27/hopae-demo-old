import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneticTestIssuerResultService } from './genetic_test_issuer_result.service';
import { GeneticTestIssuerResultEntity } from 'src/entities/genetic_test_issuer_result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneticTestIssuerResultEntity])],
  providers: [GeneticTestIssuerResultService],
  exports: [GeneticTestIssuerResultService],
})
export class GeneticTestIssuerResultModule {}
