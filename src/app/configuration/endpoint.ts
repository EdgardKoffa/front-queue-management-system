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
   service: {

    base: `${API}/services`

  },

  users: {

    base: `${API}/users`

  },

  tickets: {

    base: `${API}/tickets`

  },
counters: {

    base: `${API}/counters`

  },
  audit: {

    base: `${API}/audit`

  },
  koisks: {

    base: `${API}/kosks`

  },
  display: {

    base: `${API}/display`

  },
  notification: {

    base: `${API}/notifications`

  },
  appointement: {

    base: `${API}/appointements`

  },

  dashboard: {

    base: `${API}/dashboard`

  },
  

};