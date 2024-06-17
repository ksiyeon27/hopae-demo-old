import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneticTestIssuerTesterNonceService } from './genetic_test_issuer_tester_nonce.service';
import { GeneticTestIssuerTesterNonceEntity } from 'src/entities/genetic_test_issuer_tester_nonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneticTestIssuerTesterNonceEntity])],
  providers: [GeneticTestIssuerTesterNonceService],
  exports: [GeneticTestIssuerTesterNonceService],
})
export class GeneticTestIssuerTesterNonceModule {}
