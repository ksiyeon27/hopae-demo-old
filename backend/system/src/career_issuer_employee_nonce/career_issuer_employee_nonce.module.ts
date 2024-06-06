import { Module } from '@nestjs/common';
import { CareerIssuerEmployeeNonceService } from './career_issuer_employee_nonce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerIssuerEmployeeNonceEntity } from 'src/entities/career_issuer_employee_nonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CareerIssuerEmployeeNonceEntity])],
  providers: [CareerIssuerEmployeeNonceService],
  exports: [CareerIssuerEmployeeNonceService],
})
export class CareerIssuerEmployeeNonceModule {}
