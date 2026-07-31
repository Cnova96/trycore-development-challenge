import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ACTIVITY_REPOSITORY } from '../../infrastructure/repositories/activity.tokens';
import * as activityRepository from '../interfaces/activity.repository';
import { UpdateActivityDto } from '../dto/update-activity.dto';

@Injectable()
export class UpdateActivityUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly repository: activityRepository.ActivityRepository,
  ) {}

  async execute(id: string, dto: UpdateActivityDto) {
    const activity = await this.repository.findById(id);

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    Object.assign(activity, dto);

    if (activity.startDate > activity.endDate) {
      throw new BadRequestException('Invalid dates');
    }

    return this.repository.update(activity);
  }
}
