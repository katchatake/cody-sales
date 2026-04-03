export interface GoalPromotor {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface GoalItem {
  id: number;
  promotorId: number;
  target: number;
  month: number;
  year: number;
  createdAt?: string;
  updatedAt?: string;
  promotor?: GoalPromotor;
}

export interface GoalPayload {
  promotorId: number | null;
  target: number;
  month: number | null;
  year: number;
}
