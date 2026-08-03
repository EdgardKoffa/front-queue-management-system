import { ApplicationConfig } from './application.config';
/* REST API s endpoints */
const API = ApplicationConfig.apiBaseUrl;

export const Endpoints = {
  base_url:API,
  auth: {

    login: `${API}/auth/login`,

    refresh: `${API}/auth/refresh`,

    logout: `${API}/auth/logout`

  },

  agencies: {

    base: `${API}/agencies`

  },

  branches: {

    base: `${API}/branches`

  },

  users: {

    base: `${API}/users`

  },

  tickets: {

    base: `${API}/tickets`

  },

  dashboard: {

    base: `${API}/dashboard`

  },
  

};