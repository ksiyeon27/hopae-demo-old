import { Module } from '@nestjs/common';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
    controllers: [IssuerController],
    providers: [IssuerService, JwtService],
})
export class IssuerModule {}

