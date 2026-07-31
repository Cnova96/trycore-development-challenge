import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateActivityDto } from './application/dto/create-activity.dto';
import { UpdateActivityDto } from './application/dto/update-activity.dto';
import { ActivityResponseDto } from './application/dto/activity-response.dto';
import { CreateActivityUseCase } from './application/use-cases/create-activity.use-case';
import { UpdateActivityUseCase } from './application/use-cases/update-activity.use-case';
import { DeleteActivityUseCase } from './application/use-cases/delete-activity.use-case';
import { GetActivityUseCase } from './application/use-cases/get-activity.use-case';
import { GetActivitiesUseCase } from './application/use-cases/get-activities.use-case';
import { GetProjectActivitiesUseCase } from './application/use-cases/get-project-activities.use-case';
import { ActivityResponseMapper } from './infrastructure/mappers/activity-response.mapper';

@ApiTags('Activities')
@Controller('activities')
export class ActivityController {
  constructor(
    private readonly createActivity: CreateActivityUseCase,
    private readonly updateActivity: UpdateActivityUseCase,
    private readonly deleteActivity: DeleteActivityUseCase,
    private readonly getActivity: GetActivityUseCase,
    private readonly getActivities: GetActivitiesUseCase,
    private readonly getProjectActivities: GetProjectActivitiesUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva actividad',
  })
  @ApiCreatedResponse({
    type: ActivityResponseDto,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body()
    dto: CreateActivityDto,
  ) {
    const activity = await this.createActivity.execute(dto);

    return ActivityResponseMapper.toDto(activity);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las actividades',
  })
  @ApiOkResponse({
    type: ActivityResponseDto,

    isArray: true,
  })
  async findAll() {
    const activities = await this.getActivities.execute();

    return ActivityResponseMapper.toDtoList(activities);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar actividad por ID',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiOkResponse({
    type: ActivityResponseDto,
  })
  @ApiNotFoundResponse()
  async findOne(
    @Param('id')
    id: string,
  ) {
    const activity = await this.getActivity.execute(id);

    return ActivityResponseMapper.toDto(activity);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar actividad',
  })
  @ApiOkResponse({
    type: ActivityResponseDto,
  })
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateActivityDto,
  ) {
    const activity = await this.updateActivity.execute(id, dto);

    return ActivityResponseMapper.toDto(activity);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar actividad',
  })
  @ApiNoContentResponse()
  async remove(
    @Param('id')
    id: string,
  ) {
    await this.deleteActivity.execute(id);
  }
}
