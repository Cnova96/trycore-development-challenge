import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { Project } from '../src/modules/projects/domain/entities/project.entity';
import { Activity } from '../src/modules/activities/domain/entities/activity.entity';
import {
  createTestApp,
  TestContext,
} from './helpers/test-app.factory';
import {
  expectActivityContract,
  expectEvmContract,
  expectProjectContract,
  expectProjectEvmAnalysisContract,
} from './helpers/response-contracts';

describe('API integration (e2e)', () => {
  let context: TestContext;
  let app: INestApplication<App>;
  let projectId: string;
  let activityId: string;

  beforeAll(async () => {
    context = await createTestApp();
    app = context.app;

    const project = new Project(
      'project-test-1',
      'Proyecto de prueba',
      new Date('2026-07-01'),
      new Date('2026-07-01'),
      'Proyecto para tests de integracion',
    );
    await context.projectRepository.create(project);
    projectId = project.id;

    const activity = new Activity(
      'activity-test-1',
      'Actividad de prueba',
      10000,
      50,
      40,
      4800,
      new Date('2026-07-01'),
      new Date('2026-07-31'),
      new Date('2026-07-01'),
      new Date('2026-07-01'),
      projectId,
    );
    await context.activityRepository.create(activity);
    activityId = activity.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Projects', () => {
    it('POST /api/projects valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/projects')
        .send({
          name: 'Nuevo proyecto',
          description: 'Descripcion de prueba',
        })
        .expect(201);

      expectProjectContract(response.body);
      expect(response.body.name).toBe('Nuevo proyecto');
    });

    it('GET /api/projects valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/projects')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expectProjectContract(response.body[0]);
    });

    it('GET /api/projects/:id valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/projects/${projectId}`)
        .expect(200);

      expectProjectContract(response.body);
      expect(response.body.id).toBe(projectId);
    });

    it('PATCH /api/projects/:id valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/projects/${projectId}`)
        .send({ name: 'Proyecto actualizado' })
        .expect(200);

      expectProjectContract(response.body);
      expect(response.body.name).toBe('Proyecto actualizado');
    });

    it('GET /api/projects/:id/activities valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/projects/${projectId}/activities`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expectActivityContract(response.body[0]);
    });

    it('GET /api/projects/:id/evm-analysis valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/projects/${projectId}/evm-analysis`)
        .expect(200);

      expectProjectEvmAnalysisContract(response.body);
    });
  });

  describe('Activities', () => {
    it('POST /api/activities valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/activities')
        .send({
          name: 'Actividad creada en test',
          bac: 5000,
          plannedPercent: 30,
          executedPercent: 10,
          actualCost: 1000,
          startDate: '2026-07-01',
          endDate: '2026-07-31',
          projectId,
        })
        .expect(201);

      expectActivityContract(response.body);
      expect(response.body.projectId).toBe(projectId);
    });

    it('GET /api/activities valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/activities')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expectActivityContract(response.body[0]);
    });

    it('GET /api/activities/:id valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/activities/${activityId}`)
        .expect(200);

      expectActivityContract(response.body);
      expect(response.body.id).toBe(activityId);
    });

    it('PATCH /api/activities/:id valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/activities/${activityId}`)
        .send({ executedPercent: 45 })
        .expect(200);

      expectActivityContract(response.body);
      expect(response.body.executedPercent).toBe(45);
    });

    it('DELETE /api/activities/:id responde 200', async () => {
      const created = new Activity(
        'activity-delete-1',
        'Actividad temporal',
        1000,
        10,
        5,
        100,
        new Date('2026-07-01'),
        new Date('2026-07-31'),
        new Date('2026-07-01'),
        new Date('2026-07-01'),
        projectId,
      );
      await context.activityRepository.create(created);

      await request(app.getHttpServer())
        .delete(`/api/activities/${created.id}`)
        .expect(200);
    });
  });

  describe('EVM', () => {
    it('POST /api/evm/calculate valida contrato de respuesta', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/evm/calculate')
        .send({
          bac: 10000,
          ac: 0,
          plannedPercent: 50,
          executedPercent: 0,
        })
        .expect(201);

      expectEvmContract(response.body);
      expect(response.body.ev).toBe(0);
      expect(response.body.cpi).toBe(0);
    });
  });

  describe('Projects delete', () => {
    it('DELETE /api/projects/:id responde 200', async () => {
      const project = new Project(
        'project-delete-1',
        'Proyecto temporal',
        new Date('2026-07-01'),
        new Date('2026-07-01'),
      );
      await context.projectRepository.create(project);

      await request(app.getHttpServer())
        .delete(`/api/projects/${project.id}`)
        .expect(200);
    });
  });
});
