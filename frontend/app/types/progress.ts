export interface ProgressItem {
  promotorId: number;
  promotorName: string;
  totalSold: number;
  target: number;
  percentage: number;
}

export interface MilestoneItem {
  threshold: number;
  label: string;
  achieved: boolean;
  description: string;
}
