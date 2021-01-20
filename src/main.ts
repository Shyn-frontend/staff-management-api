import ConfigService from './shared/config/config.service';
ConfigService.init();

import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { IConfig } from './config.interface';
import { CONFIG } from './shared/config/config.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<IConfig>(CONFIG);
  const logger = new Logger('Staff-Management-Nestjs');

  logger.debug(`Environment: ${config.app.env}`);

  app.use(compression());
  app.use(cors());
  app.use(helmet());

  if (config.app.isSwaggerEnabled) {
    const options = new DocumentBuilder()
      .setTitle('Staff management')
      .setDescription('Staff Management APIs docs')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        docExpansion: 'none',
        explorer: true,
        filter: true,
        showRequestDuration: true,
      },
    });
    logger.debug(`Swagger Docs enabled: ${config.app.domain}/api-docs`);
  }

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.app.port, () => {
    logger.debug(`Listening on port: ${config.app.port}`);
  });
}
bootstrap();
