export class Project {
  constructor(
    public readonly id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string,
  ) {}
}
