import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

import {
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';

import { AppModule } from './app.module';
import {
  GlobalExceptionHandler,
} from './config/exceptions/global.exception.handler';
import { ValidateInputPipe } from './config/pipes/validate.input.pipe';

// import { LoggerInterceptor } from './interceptors/logger/logger.interceptor';

async function bootstrap() {
  const port = process.env.PORT || 4550;
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidateInputPipe());
  // app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new GlobalExceptionHandler(httpAdapter));
  app.use(cookieParser());
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(port);
}
bootstrap();
