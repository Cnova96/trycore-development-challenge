export type EvmStatus = 'good' | 'warning' | 'critical';

export function getIndexStatus(value: number): EvmStatus {
  if (value >= 1) {
    return 'good';
  }

  if (value >= 0.9) {
    return 'warning';
  }

  return 'critical';
}

export function getStatusLabel(status: EvmStatus): string {
  switch (status) {
    case 'good':
      return 'Saludable';
    case 'warning':
      return 'Atención';
    case 'critical':
      return 'Crítico';
  }
}
