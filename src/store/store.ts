import { create } from 'zustand'
import { post, get as getApi, put, deleteRequest } from '@/utils/api'
import API_ENDPOINTS from '@/utils/api-endpoints'
import type { ApiResponse } from '@/type/todo.types'

export type ChecklistItem = {
  _id: string
  text: string
  completed: boolean
}

export type Todo = {
  _id: string
  title: string
  checklistItems: ChecklistItem[]
}
export type UpdateChecklistItem = {
  taskId: string
  items: ChecklistItem[]
}

// API response interfaces

type TodoStore = {
  todos: Todo[]
  loading: boolean
  deleteLoading: boolean
  error: string | null

  // API functions
  fetchTodos: () => Promise<void>
  addTodo: (title: string, checklistItems: string[]) => Promise<void>
  updateTodo: (id: string, data: Todo) => Promise<void>
  upadateChecklistItem: (payload:UpdateChecklistItem) => Promise<void>
  
  // Local functions
  removeTodo: (id: string) => void
  toggleChecklistItem: (todoId: string, itemId: string) => void

}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  deleteLoading: false,
  error: null,

  // Fetch all todos from API
  fetchTodos: async () => {
    set({ loading: true, error: null })
    try {
      const todos = await getApi<ApiResponse<Todo[]>>(
        API_ENDPOINTS.TASKS.GET_ALL,
      )
      set({ todos: todos.data, loading: false })
    } catch (error: any) {
      console.error('Error fetching todos:', error)
      set({
        error: error.message || 'Failed to fetch todos',
        loading: false,
      })
    }
  },

  // Add a new todo with API integration
  addTodo: async (title, checklistItems) => {
    try {
      const newTodo = {
        title,
        checklistItems: checklistItems.map((text) => ({
          text,
          completed: false,
        })),
      }

      const addTodo = await post<ApiResponse<Todo>>(
        API_ENDPOINTS.TASKS.CREATE,
        newTodo,
      )
      // Then send to API
      set((state) => ({ todos: [addTodo.data, ...state.todos] }))
    } catch (error: any) {

      set({
        error: error.response.data.message,
        loading: false,
      })
    }
  },

  // Update todo with API integration
  updateTodo: async (id, updatedPayload) => {
    // Get current todo
    const currentTodo = get().todos.find((todo) => todo._id === id)
    if (!currentTodo) return

    const updatedTodo = await put<ApiResponse<Todo>>(
      API_ENDPOINTS.TASKS.UPDATE(id),
      updatedPayload,
    )
    // Optimistic update
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === id ? updatedTodo.data : todo,
      ),
    }))

    // Send to API
  },

  // Keep the original local functions
  removeTodo: async (id) => {
    try {
      set((state) => ({
        todos: state.todos,
        deleteLoading: true,
      }))
      await deleteRequest(API_ENDPOINTS.TASKS.DELETE(id))
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== id),
        deleteLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response.data.message,
        deleteLoading: false,
      })
    }
  },

  toggleChecklistItem: (todoId, itemId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              checklistItems: todo.checklistItems.map((item) =>
                item._id === itemId
                  ? { ...item, completed: !item.completed }
                  : item,
              ),
            }
          : todo,
      ),
    })),

  upadateChecklistItem: async (payload:UpdateChecklistItem) => {
    try {
      set((state) => ({
        todos: state.todos,
        deleteLoading: true,
      }))
      await put(API_ENDPOINTS.TASKS.UPDATE_CHECKLIST_STATUS, payload)
      set((state) => ({
        todos: state.todos,
        deleteLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response.data.message,
        deleteLoading: false,
      })
    }
  },
}))
