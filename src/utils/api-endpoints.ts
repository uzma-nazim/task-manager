/**
 * API endpoints object to centralize all API endpoints
 */
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
  TASKS: {
    BASE: '/tasks',
    GET_ALL: '/tasks',
    CREATE: '/tasks',
    UPDATE_CHECKLIST_STATUS: '/tasks/checklist/status',
    GET_BY_ID: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
  }
};

export default API_ENDPOINTS; 