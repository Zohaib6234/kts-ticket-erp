

export interface Depot {
  id: string;
  depotCode: string;
  depotName: string;
}

export interface Supervisor {
  id: string;
  supervisorCode: string;
  supervisorName: string;
}

export interface TicketCategory {
  id: string;
  name: string;
  amount: number;
}

export interface TicketIssue {
  id: string;

  depotId: string;
  depot: Depot;

  supervisorId: string;
  supervisor: Supervisor;

  ticketCategoryId: string;
  ticketCategory: TicketCategory;

  quantity: number;

  issueDate: string;

  remarks?: string;

  createdAt: string;
  updatedAt: string;
}

export interface TicketIssueFormData {
  depotId: string;

  supervisorId: string;

  ticketCategoryId: string;

  quantity: number;

  remarks?: string;
}

