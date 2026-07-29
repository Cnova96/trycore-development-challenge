import { IsString, IsNumber, Min, Max, IsDateString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  bac: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  plannedPercent: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  executedPercent: number;

  @IsNumber()
  @Min(0)
  actualCost: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  projectId: string;
}
