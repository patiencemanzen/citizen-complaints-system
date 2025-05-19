import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
