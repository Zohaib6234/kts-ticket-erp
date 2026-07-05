

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

export interface TicketBook {
  id: string;

  startingSerial: number;
  endingSerial: number;

  totalTickets: number;

  vendor: string;

  status: string;

  ticketCategory: TicketCategory;
}

export interface IssueReport {
  id: string;

  depot: Depot;

  supervisor: Supervisor;

  ticketBook: TicketBook;

  issueDate: string;

  status: string;

  remarks?: string;

  createdAt: string;
  updatedAt: string;
}
