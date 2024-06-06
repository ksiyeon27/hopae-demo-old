import { Module } from '@nestjs/common';
import { CareerIssuerCertificateService } from './career_issuer_certificate.service';
import { CareerIssuerCertificateEntity } from 'src/entities/career_issuer_certificate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CareerIssuerCertificateEntity])],
  providers: [CareerIssuerCertificateService],
  exports: [CareerIssuerCertificateService],
})
export class CareerIssuerCertificateModule {}
