import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneticTestIssuerMeEntity } from 'src/entities/genetic_test_issuer_me.entity';
import { GeneticTestIssuerMeService } from './genetic_test_issuer_me.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneticTestIssuerMeEntity])],
  providers: [GeneticTestIssuerMeService],
  exports: [GeneticTestIssuerMeService],
})
export class GeneticTestIssuerMeModule {}
