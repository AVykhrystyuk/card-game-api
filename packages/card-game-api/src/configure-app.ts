import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

export function configureApp(app: INestApplication) {
  // app.setGlobalPrefix('api'); // prefix can be added during deployment

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });
}
