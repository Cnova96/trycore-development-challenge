export class Activity {
  constructor(
    public readonly id: string,

    public name: string,

    public bac: number,

    public plannedPercent: number,

    public executedPercent: number,

    public actualCost: number,

    public startDate: Date,

    public endDate: Date,
    public createdAt: Date,
    public updatedAt: Date,

    public projectId: string,
  ) {}
}
