

export interface TicketCategory {
  id: string;

  name: string;

  amount: number;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface TicketCategoryFormData {
  name: string;

  amount: number;
}

