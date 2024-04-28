import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuerModule } from './issuer/issuer.module';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [IssuerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
