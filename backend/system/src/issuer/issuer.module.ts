import { Module } from '@nestjs/common';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';
import { CareerIssuerEmployeeModule } from 'src/career_issuer_employee/career_issuer_employee.module';

@Module({
  imports: [JwtModule, DidResolverModule, CareerIssuerEmployeeModule],
  controllers: [IssuerController],
  providers: [IssuerService],
})
export class IssuerModule {}
