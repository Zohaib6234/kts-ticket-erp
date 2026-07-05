

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

export interface TicketStock {
  id: string;

  vendor: string;

  depotId: string;
  depot: Depot;

  ticketCategoryId: string;
  ticketCategory: TicketCategory;

  startingSerial: number;
  endingSerial: number;

  quantity: number;

  receivedDate: string;

  remarks?: string;

  createdAt: string;
  updatedAt: string;
}

export interface TicketStockFormData {
  vendor: string;

  depotId: string;

  ticketCategoryId: string;

  startingSerial: number;

  endingSerial: number;

  remarks?: string;
}

