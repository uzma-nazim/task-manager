"use client"
import TaskItem from "@/components/task-item"
import type { Todo } from "@/store/store"

type TodoListProps = {
  todos: Todo[]
}

export default function TaskList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No active tasks. Add a new task to get started!</div>
  }
  return (
    <div>
      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
          >
            <TaskItem todo={todo} />
          </div>
        ))}
      </div>
    </div>
  )
}
