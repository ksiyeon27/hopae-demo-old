import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerIssuerMeService } from './career_issuer_me.service';
import { CareerIssuerMeEntity } from 'src/entities/career_issuer_me.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CareerIssuerMeEntity])],
  providers: [CareerIssuerMeService],
  exports: [CareerIssuerMeService],
})
export class CareerIssuerMeModule {}
