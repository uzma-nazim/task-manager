import axios from 'axios';

// Base URL from environment or default
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});
api.interceptors.request.use((config) => {
  
  return config;
});


// Function to set the auth token for all future requests
export const setAuthToken = (token: string | null) => {
  
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * GET request
 */
async function get<T>(url: string, params = {}): Promise<T> {
  try {
    const response = await api.get<T>(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
}

/**
 * POST request
 */
async function post<T>(url: string, data = {}): Promise<T> {
  try {
    const response = await api.post<T>(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
}

/**
 * PUT request
 */
async function put<T>(url: string, data = {}): Promise<T> {
  try {
    const response = await api.put<T>(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
}

/**
 * DELETE request
 */
async function deleteRequest<T>(url: string, params = {}): Promise<T> {
  try {
    const response = await api.delete<T>(url, { params });
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
}

// Export functions
export {
  get,
  post,
  put,
  deleteRequest
}; 