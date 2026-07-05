

export interface Depot {
  id: string;
  depotCode: string;
  depotName: string;
}

export interface Route {
  id: string;
  routeNo: number;
  routeName: string;
}

export interface Supervisor {
  id: string;

  supervisorCode: string;
  supervisorName: string;

  depotId: string;
  depot: Depot;

  routeId: string;
  route: Route;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface SupervisorFormData {
  supervisorCode: string;
  supervisorName: string;

  depotId: string;
  routeId: string;
}

