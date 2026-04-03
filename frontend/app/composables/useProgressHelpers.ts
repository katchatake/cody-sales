import type { ProgressItem } from '../types/progress';

export const useProgressHelpers = () => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 2,
    }).format(value);

  const buildAggregateProgress = (progressItems: ProgressItem[]): ProgressItem | null => {
    if (!progressItems.length) {
      return null;
    }

    const totalSold = progressItems.reduce((sum, item) => sum + item.totalSold, 0);
    const target = progressItems.reduce((sum, item) => sum + item.target, 0);
    const percentage = target > 0 ? (totalSold / target) * 100 : 0;

    return {
      promotorId: 0,
      promotorName: 'Equipo',
      totalSold,
      target,
      percentage: Number(percentage.toFixed(2)),
    };
  };

  return {
    formatCurrency,
    buildAggregateProgress,
  };
};
