import { Module } from '@nestjs/common';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';
import { CareerVerifierApplicantNonceModule } from 'src/career_verifier_applicant_nonce/career_verifier_applicant_nonce.module';

@Module({
  imports: [JwtModule, DidResolverModule, CareerVerifierApplicantNonceModule],
  controllers: [VerifierController],
  providers: [VerifierService],
})
export class VerifierModule {}
