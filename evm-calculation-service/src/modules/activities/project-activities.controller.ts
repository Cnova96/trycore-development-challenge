import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetProjectActivitiesUseCase } from './application/use-cases/get-project-activities.use-case';
import { ActivityResponseDto } from './application/dto/activity-response.dto';
import { ActivityResponseMapper } from './infrastructure/mappers/activity-response.mapper';

@ApiTags('Projects')
@Controller('projects')
export class ProjectActivitiesController {
  constructor(
    private readonly getProjectActivities: GetProjectActivitiesUseCase,
  ) {}

  @Get(':id/activities')
  @ApiOperation({
    summary: 'Listar actividades de un proyecto',
  })
  @ApiOkResponse({
    type: ActivityResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse()
  async findActivities(@Param('id') id: string) {
    const activities = await this.getProjectActivities.execute(id);

    return ActivityResponseMapper.toDtoList(activities);
  }
}
