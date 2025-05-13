'use client'

import { useEffect } from 'react'
import TaskForm from '@/components/task-form'
import TaskList from '@/components/task-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTodoStore } from '@/store/store'
import { Loader2 } from 'lucide-react'
import { useAuthApi } from '@/hooks/useAuthApi'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

export default function TaskApp() {
  const { todos, loading, error, fetchTodos } = useTodoStore()
  const isAuthenticated = useIsAuthenticated()

  useAuthApi()
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos()
    }
  }, [])

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">
          Task Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
        )}

        <TaskForm />
        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="w-20 h-20 animate-spin" />
          </div>
        )}
        <TaskList todos={todos} />
      </CardContent>
    </Card>
  )
}
