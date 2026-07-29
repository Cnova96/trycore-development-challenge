export interface EvmMetrics {
  pv: number;
  ev: number;
  ac: number;
  cv: number;
  sv: number;
  cpi: number;
  spi: number;
  eac: number;
  vac: number;
}

export interface Activity {
  id?: string;
  name: string;
  bac: number;
  plannedPercent: number;
  executedPercent: number;
  actualCost: number;
  startDate: string;
  endDate: string;
  projectId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityWithEvm {
  activity: Activity;
  evm: EvmMetrics;
}

export interface ProjectEvmAnalysis {
  activities: ActivityWithEvm[];
  consolidated: EvmMetrics;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityFormValue {
  name: string;
  bac: number;
  plannedPercent: number;
  executedPercent: number;
  actualCost: number;
  startDate: string;
  endDate: string;
}
