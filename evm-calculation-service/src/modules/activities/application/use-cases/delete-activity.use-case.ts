import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTIVITY_REPOSITORY } from '../../infrastructure/repositories/activity.tokens';
import * as activityRepository from '../interfaces/activity.repository';

@Injectable()
export class DeleteActivityUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly repository: activityRepository.ActivityRepository,
  ) {}

  async execute(id: string) {
    const exists = await this.repository.exists(id);

    if (!exists) throw new NotFoundException('Activity not found');

    await this.repository.delete(id);
  }
}
