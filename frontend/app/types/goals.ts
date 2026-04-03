export interface GoalItem {
  id: number;
  promotorId: number;
  target: number;
  month: number;
  year: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GoalPayload {
  promotorId: number | null;
  target: number;
  month: number | null;
  year: number;
}
