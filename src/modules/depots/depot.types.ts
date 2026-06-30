
export interface Depot {
  id: string;
  depotCode: string;
  depotName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DepotFormData {
  depotCode: string;
  depotName: string;
}

