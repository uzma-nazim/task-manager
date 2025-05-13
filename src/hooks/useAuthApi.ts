import { useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { setAuthToken } from '@/utils/api';

/**
 * Hook that initializes the API with the current auth token
 * This should be used in a root component to ensure the API
 * always has the current auth token
 */
export function useAuthApi() {
  const authHeader = useAuthHeader();
  
  
  useEffect(() => {
    
    // If auth header exists, extract the token and set it for API calls
    if (authHeader) {
      // The header is in format "Bearer token123"
      const token = authHeader.split(' ')[1];
      setAuthToken(token);
    } else {
      // Clear token if no auth header
      setAuthToken(null);
    }
  }, [authHeader]);
} 