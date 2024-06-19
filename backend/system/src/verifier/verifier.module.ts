import { Module } from '@nestjs/common';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { CareerVerifierApplicantNonceModule } from 'src/career_verifier_applicant_nonce/career_verifier_applicant_nonce.module';
import { GeneticTestVerifierMemberNonceModule } from 'src/genetic_test_verifier_member_nonce/genetic_test_verifier_member_nonce.module';

@Module({
  imports: [
    JwtModule,
    CareerVerifierApplicantNonceModule,
    GeneticTestVerifierMemberNonceModule,
  ],
  controllers: [VerifierController],
  providers: [VerifierService],
})
export class VerifierModule {}
