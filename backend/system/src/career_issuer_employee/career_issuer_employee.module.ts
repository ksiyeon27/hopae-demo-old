import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerIssuerEmployeeEntity } from 'src/entities/career_issuer_employee.entity';
import { CareerIssuerEmployeeService } from './career_issuer_employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([CareerIssuerEmployeeEntity])],
  providers: [CareerIssuerEmployeeService],
  exports: [CareerIssuerEmployeeService],
})
export class CareerIssuerEmployeeModule {}
