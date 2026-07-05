

export type BookStatus =
  | "IN_STOCK"
  | "ISSUED"
  | "RETURNED"
  | "MISSING"
  | "DISCARDED";

export interface Depot {
  id: string;
  depotCode: string;
  depotName: string;
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

  depotId: string;
  depot: Depot;

  ticketCategoryId: string;
  ticketCategory: TicketCategory;

  status: BookStatus;

  createdAt: string;
  updatedAt: string;
}

export interface ReceiveBookFormData {
  vendor: string;

  depotId: string;

  ticketCategoryId: string;

  startSerial: number;

  endSerial: number;
}

