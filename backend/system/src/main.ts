import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
      {
        whitelist: true, // validator will strip validated object of any properties that do not have any decorators - validator 에 도달도 못하게
        forbidNonWhitelisted: true, // instead of stripping non-whitelisted properties validator will throw an error
        transform: true // movieId number type 으로 변경 가능
      }
    )
  );
  await app.listen(3000);
}
bootstrap();
