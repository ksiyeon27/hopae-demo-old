import { Module } from '@nestjs/common';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [IssuerController],
  providers: [IssuerService],
})
export class IssuerModule {}
