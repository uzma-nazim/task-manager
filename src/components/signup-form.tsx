import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { post } from '@/utils/api'
import { useNavigate, Link } from '@tanstack/react-router'
import type { SignUpFormData, AuthResponse } from '@/type/auth.types'
import { validateTodo, type ValidationError } from '@/validation/schema'
import { signUpSchema } from '@/validation/auth.schema'

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignUpFormData>({
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

    const validation = validateTodo(formData, signUpSchema)
    if (validation?.errors) {
      setError(validation?.errors)
      return
    }

    setLoading(true)

    try {
       await post<AuthResponse>('/auth/register', formData)

      // Reset form
      setFormData({
        username: '',
        password: '',
      })

      // Navigate to dashboard or home page
      navigate({ to: '/' })
    } catch (err: any) {

      const errorMsg = err.response.data.message
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
      { <p className="h-[10px] text-sm text-red-500">{error?.error}</p>}

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to create your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Name</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter Name"
            value={formData.username}
            onChange={handleChange}
          />
          {error?.username && <p className="text-sm text-red-500">{error.username}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="************"
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
          {'Sign Up'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  )
}
