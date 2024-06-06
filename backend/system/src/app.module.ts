import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuerModule } from './issuer/issuer.module';
import { WalletModule } from './wallet/wallet.module';
import { JwtModule } from './jwt/jwt.module';
import { DidResolverModule } from './did_resolver/did_resolver.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CareerIssuerMeEntity } from './entities/career_issuer_me.entity';
import { CareerIssuerMeModule } from './career_issuer_me/career_issuer_me.module';
import { CareerIssuerEmployeeModule } from './career_issuer_employee/career_issuer_employee.module';
import { CareerIssuerEmployeeEntity } from './entities/career_issuer_employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', //프로젝트 배포시엔 환경파일 .env 을 넘기지 않도록 하는 설정
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(), //package.json 에서 명령어로 설정
        DB_HOST: Joi.string().required(), //DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME 은 .env 파일에 설정
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true, //엔티티와 데이터베이스 테이블을 자동으로 동기화할지 여부를 지정합니다. 이 경우 true로 설정하여 자동 동기화를 활성화합니다. 개발모드에서만 사용해야
      logging: false,
      entities: [CareerIssuerMeEntity, CareerIssuerEmployeeEntity],
    }),
    IssuerModule,
    WalletModule,
    JwtModule,
    DidResolverModule,
    CareerIssuerMeModule,
    CareerIssuerEmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
