import { INestApplication } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER } from './swagger.constants';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()

    .setTitle(SWAGGER.TITLE)

    .setDescription(SWAGGER.DESCRIPTION)

    .setVersion(SWAGGER.VERSION)

    .addServer('http://localhost:3000')

    .addTag('Projects', 'Administración de proyectos')

    .addTag('Activities', 'Administración de actividades')

    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER.PATH, app, document);
}
