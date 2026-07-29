import { Body, Controller, Post } from '@nestjs/common';
import { CreateActivityUseCase } from './application/use-cases/create-activity.use-case';
import { CreateActivityDto } from './application/create-activity.dto';

@Controller('activities')
export class ActivityController {
  constructor(private readonly createActivity: CreateActivityUseCase) {}

  @Post()
  create(
    @Body()
    dto: CreateActivityDto,
  ) {
    return this.createActivity.execute(dto);
  }
}
