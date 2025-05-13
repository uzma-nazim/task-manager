import createRefresh from 'react-auth-kit/createRefresh'
import { post } from './api'
import type { TokenResponse } from '@/type/auth.types'
import API_ENDPOINTS from './api-endpoints'
export const refresh = createRefresh({
  interval: 10 / 60, // 1 hour in secondsF
  refreshApiCallback: async (param) => {

    try {
      const response = await post<TokenResponse>(API_ENDPOINTS.AUTH.REFRESH, {
        refreshToken: param.refreshToken,
      })
      
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      }
    } catch (error) {
      console.error(error)
    //   window.location.href = '/'
      return {
        isSuccess: false,
        newAuthToken: '',
        newAuthTokenExpireIn: 0,
        newRefreshTokenExpiresIn: 0,
      }
    }
  },
})
