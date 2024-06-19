import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';
import { CareerIssuerMeModule } from 'src/career_issuer_me/career_issuer_me.module';
import { TestHolderModule } from 'src/test_holder/test_holder.module';
import { CareerVerifierApplicantNonceModule } from 'src/career_verifier_applicant_nonce/career_verifier_applicant_nonce.module';
import { GeneticTestIssuerMeModule } from 'src/genetic_test_issuer_me/genetic_test_issuer_me.module';
import { GeneticTestVerifierMemberNonceModule } from 'src/genetic_test_verifier_member_nonce/genetic_test_verifier_member_nonce.module';

@Module({
  imports: [
    DidResolverModule,
    CareerIssuerMeModule,
    GeneticTestIssuerMeModule,
    TestHolderModule,
    CareerVerifierApplicantNonceModule,
    GeneticTestVerifierMemberNonceModule,
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
