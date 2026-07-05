

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

export interface StockBook {
  id: string;

  startingSerial: number;
  endingSerial: number;

  totalTickets: number;

  vendor: string;

  status: string;

  depotId: string;
  depot: Depot;

  ticketCategoryId: string;
  ticketCategory: TicketCategory;

  createdAt: string;
  updatedAt: string;
}

