import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { configureApp } from '../../configure-app';

export async function BuildTestApp(
  metadata: ModuleMetadata,
): Promise<INestApplication> {
  const module = await Test.createTestingModule(metadata).compile();

  const app = module.createNestApplication();
  configureApp(app);
  await app.init();

  return app;
}
