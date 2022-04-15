import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigService } from './app-config.service';
import { configureApp } from './configure-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const config = await app.resolve(AppConfigService);
  await app.listen(config.apiPort);
}
bootstrap();
