import { environment } from "../../environments/environment";

export const ApplicationConfig = {
  appName: 'NS Global Queue Management',

  version: '1.0.0',

  apiBaseUrl:`${environment.apiUrl}`, //'http://localhost:2026/api/v1',//https://queue-management-system-4syh.onrender.com/api/v1

  websocketUrl: `${environment.wsUrl}`,//'http://localhost:2026/ws'

} as const;

