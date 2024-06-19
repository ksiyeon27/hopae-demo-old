import { Module } from '@nestjs/common';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';
import { CareerIssuerEmployeeModule } from 'src/career_issuer_employee/career_issuer_employee.module';
import { CareerIssuerEmployeeNonceModule } from 'src/career_issuer_employee_nonce/career_issuer_employee_nonce.module';
import { CareerIssuerCertificateModule } from 'src/career_issuer_certificate/career_issuer_certificate.module';
import { GeneticTestIssuerTesterNonceModule } from 'src/genetic_test_issuer_tester_nonce/genetic_test_issuer_tester_nonce.module';
import { GeneticTestIssuerResultModule } from 'src/genetic_test_issuer_result/genetic_test_issuer_result.module';
import { GeneticTestIssuerCertificateModule } from 'src/genetic_test_issuer_certificate/genetic_test_issuer_certificate.module';

@Module({
  imports: [
    JwtModule,
    DidResolverModule,
    CareerIssuerEmployeeModule,
    GeneticTestIssuerResultModule,
    CareerIssuerEmployeeNonceModule,
    CareerIssuerCertificateModule,
    GeneticTestIssuerTesterNonceModule,
    GeneticTestIssuerCertificateModule,
  ],
  controllers: [IssuerController],
  providers: [IssuerService],
})
export class IssuerModule {}
