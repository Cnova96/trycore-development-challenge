import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTIVITY_REPOSITORY } from '../../infrastructure/repositories/activity.tokens';
import * as activityRepository from '../interfaces/activity.repository';

@Injectable()
export class GetActivityUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly repository: activityRepository.ActivityRepository,
  ) {}

  async execute(id: string) {
    const activity = await this.repository.findById(id);

    if (!activity) throw new NotFoundException('Activity not found');

    return activity;
  }
}
