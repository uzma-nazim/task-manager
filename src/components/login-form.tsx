import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { post } from '@/utils/api'
import { useNavigate, Link } from '@tanstack/react-router'
import type { LoginFormData, AuthResponse } from '@/type/auth.types'
import { validateTodo, type ValidationError } from '@/validation/schema'
import { loginSchema } from '@/validation/auth.schema'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import API_ENDPOINTS from '@/utils/api-endpoints'
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const navigate = useNavigate()
  const signIn = useSignIn()
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ValidationError | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateTodo(formData, loginSchema)
    if (validation?.errors) {
      setError(validation?.errors)
      return
    }

    setLoading(true)

    try {
      const response = await post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, formData)
      
      const data = response.data
      
      
      signIn({
        auth: {
          token: data.accessToken,
          type: 'Bearer',
        },
        refresh: data.refreshToken,
        userState: {...response.data.user, refreshToken:data.refreshToken},
      })
      

      // Reset form
      setFormData({
        username: '',
        password: '',
      })

      // Navigate to dashboard or home page
      navigate({ to: '/dashboard' ,replace:true})
    } catch (err: any) {

      const errorMsg = err.response?.data?.message
        ? err.response.data.message
        : 'Something went wrong. Please try again.'
      setError({
        error: errorMsg,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={handleSubmit}
    >
      {<p className="h-[10px] text-sm text-red-500">{error?.error}</p>}

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your credentials to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          {error?.username && (
            <p className="text-sm text-red-500">{error.username}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {error?.password && (
            <p className="text-sm text-red-500">{error.password}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          isLoading={loading}
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
