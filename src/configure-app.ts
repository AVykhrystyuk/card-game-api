import { INestApplication, VersioningType } from '@nestjs/common';

export function configureApp(app: INestApplication) {
  // app.setGlobalPrefix('api'); // prefix can be added during deployment

  app.enableVersioning({
    type: VersioningType.URI,
  });
}
