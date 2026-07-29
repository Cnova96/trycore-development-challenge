import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/config/prisma/prisma.service';
import { ACTIVITY_REPOSITORY } from '../../src/modules/activities/infrastructure/repositories/activity.tokens';
import {
  InMemoryActivityRepository,
  InMemoryProjectRepository,
} from './in-memory.repositories';

export interface TestContext {
  app: INestApplication;
  projectRepository: InMemoryProjectRepository;
  activityRepository: InMemoryActivityRepository;
}

export async function createTestApp(): Promise<TestContext> {
  const projectRepository = new InMemoryProjectRepository();
  const activityRepository = new InMemoryActivityRepository();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider('ProjectRepository')
    .useValue(projectRepository)
    .overrideProvider(ACTIVITY_REPOSITORY)
    .useValue(activityRepository)
    .overrideProvider(PrismaService)
    .useValue({
      onModuleInit: async () => undefined,
      $connect: async () => undefined,
    })
    .compile();

  const app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.init();

  return { app, projectRepository, activityRepository };
}
