import { Module } from '@nestjs/common';
import { CareerVerifierApplicantNonceService } from './career_verifier_applicant_nonce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerVerifierApplicantNonceEntity } from 'src/entities/career_verifier_applicant_nonce.enity';

@Module({
  imports: [TypeOrmModule.forFeature([CareerVerifierApplicantNonceEntity])],
  providers: [CareerVerifierApplicantNonceService],
  exports: [CareerVerifierApplicantNonceService],
})
export class CareerVerifierApplicantNonceModule {}
