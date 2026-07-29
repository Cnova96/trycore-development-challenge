export const EVM_RESULT_KEYS = [
  'pv',
  'ev',
  'ac',
  'cv',
  'sv',
  'cpi',
  'spi',
  'eac',
  'vac',
] as const;

export function expectProjectContract(body: Record<string, unknown>): void {
  expect(body).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }),
  );
}

export function expectActivityContract(body: Record<string, unknown>): void {
  expect(body).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      bac: expect.any(Number),
      plannedPercent: expect.any(Number),
      executedPercent: expect.any(Number),
      actualCost: expect.any(Number),
      startDate: expect.any(String),
      endDate: expect.any(String),
      projectId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }),
  );
}

export function expectEvmContract(body: Record<string, unknown>): void {
  for (const key of EVM_RESULT_KEYS) {
    expect(body[key]).toEqual(expect.any(Number));
  }
}

export function expectProjectEvmAnalysisContract(
  body: Record<string, unknown>,
): void {
  expect(Array.isArray(body.activities)).toBe(true);
  expectEvmContract(body.consolidated as Record<string, unknown>);

  for (const item of body.activities as Array<Record<string, unknown>>) {
    expectActivityContract(item.activity as Record<string, unknown>);
    expectEvmContract(item.evm as Record<string, unknown>);
  }
}
