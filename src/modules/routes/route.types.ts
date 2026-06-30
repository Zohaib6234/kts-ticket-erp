

export interface Route {
  id: string;
  routeNo: number;
  routeName: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RouteFormData {
  routeNo: number;
  routeName: string;
  description: string;
}

