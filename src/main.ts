import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  app.use(cors());
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('Baseline clone')
    .setDescription('Baseline Nestjs clone APIs description')
    .setVersion('1.0')
    .addTag('baseline-nestjs')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      explorer: true,
      filter: true,
      showRequestDuration: true,
    },
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
