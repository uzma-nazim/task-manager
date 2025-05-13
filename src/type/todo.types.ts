export type Todo = {
  id?: string
  title: string
  description?: string
  completed: boolean
  checklist: ChecklistItem[]
}
export type ChecklistItem = {
  id?: string
  text: string
  completed: boolean
}
export interface ApiResponse<T> {
  data: T
}
