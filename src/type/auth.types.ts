/**
 * Interface for sign up form data
 */
export interface SignUpFormData {
  username: string
  password: string
}

/**
 * Interface for login form data
 */
export interface LoginFormData {
  username: string
  password: string
}

/**
 * Interface for auth API response
 */
export interface AuthResponse {
  data: {
    accessToken: string
    refreshToken: string
    user: {
      id: string
      username: string
    }
  }
}

export interface TokenResponse {
  data: {
    accessToken: string    
  }
}

