import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneticTestIssuerCertificateEntity } from 'src/entities/genetic_test_issuer_certificate.entity';
import { GeneticTestIssuerCertificateService } from './genetic_test_issuer_certificate.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneticTestIssuerCertificateEntity])],
  providers: [GeneticTestIssuerCertificateService],
  exports: [GeneticTestIssuerCertificateService],
})
export class GeneticTestIssuerCertificateModule {}
