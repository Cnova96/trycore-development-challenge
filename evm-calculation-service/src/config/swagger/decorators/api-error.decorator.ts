import { applyDecorators } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiDefaultErrors() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Solicitud inválida.',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error interno del servidor.',
    }),
  );
}
