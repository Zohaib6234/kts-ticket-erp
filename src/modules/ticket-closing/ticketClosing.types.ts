

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
  quantity: number;
}

export interface TicketClosing {
  id: string;

  issueId: string;
  issue: TicketIssue;

  supervisorId: string;
  supervisor: Supervisor;

  ticketCategoryId: string;
  ticketCategory: TicketCategory;

  issuedQuantity: number;
  soldQuantity: number;
  returnedQuantity: number;
  missingQuantity: number;

  totalAmount: number;

  closingDate: string;

  remarks?: string;

  createdAt: string;
  updatedAt: string;
}

export interface TicketClosingFormData {
  issueId: string;

  supervisorId: string;

  ticketCategoryId: string;

  soldQuantity: number;

  returnedQuantity: number;

  remarks?: string;
}

