import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneticTestVerifierMemberNonceService } from './genetic_test_verifier_member_nonce.service';
import { GeneticTestVerifierMemberNonceEntity } from 'src/entities/genetic_test_verifier_member_nonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneticTestVerifierMemberNonceEntity])],
  providers: [GeneticTestVerifierMemberNonceService],
  exports: [GeneticTestVerifierMemberNonceService],
})
export class GeneticTestVerifierMemberNonceModule {}
