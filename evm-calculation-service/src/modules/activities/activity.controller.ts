import { Body, Controller, Post } from '@nestjs/common';
import { CreateActivityUseCase } from './application/use-cases/create-activity.use-case';
import { CreateActivityDto } from './application/dto/create-activity.dto';
import { ApiDefaultErrors } from 'src/config/swagger/decorators/api-error.decorator';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ActivityResponseDto } from './application/dto/activity-response.dto';

@Controller('activities')
export class ActivityController {
  constructor(private readonly createActivity: CreateActivityUseCase) {}

  @Post()
  @ApiDefaultErrors()
  @ApiOperation({
    summary: 'Crear actividad',
  })
  @ApiCreatedResponse({
    type: ActivityResponseDto,
  })
  create(
    @Body()
    dto: CreateActivityDto,
  ) {
    return this.createActivity.execute(dto);
  }
}
