'use client'

import { useState } from 'react'
import { useTodoStore, type Todo } from '@/store/store'
import {
  todoUpdateSchema,
  validateTodo,
  type ValidationError,
} from '@/validation/schema'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Pencil, Save, X, Plus, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import ChecklistItemComponent from '@/components/checklist-item'
import type { ChecklistItem } from '@/type/todo.types'

type TodoItemProps = {
  todo: Todo
}

export default function TaskItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    todo.checklistItems,
  )

  const [errors, setErrors] = useState<ValidationError | null>(null)
  const { removeTodo, updateTodo, deleteLoading } = useTodoStore()
  const [btnLoading, setbtnLoading] = useState(false)

  // Calculate how many items are completed
  const completedItems = todo.checklistItems.filter(
    (item) => item.completed,
  ).length
  const totalItems = todo.checklistItems.length

  const handleSave = async () => {
    try {
      const validation = validateTodo(
        {
          title,
          checklistItems,
        },
        todoUpdateSchema,
      )

      if (validation?.errors) {
        setErrors(validation.errors)
        return
      }

      setbtnLoading(true)
      await updateTodo(todo._id, validation?.value)
      setIsEditing(false)
      setErrors(null)
      setbtnLoading(false)
    } catch (error) {
      setErrors({ error: 'Something went wrong' })
    }
  }

  const handleCancel = () => {
    setTitle(todo.title)
    setChecklistItems(todo.checklistItems)
    setIsEditing(false)
    setErrors(null)
  }

  const handleChecklistItemChange = (index: number, value: string) => {
    const newItems = [...checklistItems]
    newItems[index] = { ...newItems[index], text: value }
    setChecklistItems(newItems)
  }

  const addChecklistItem = () => {
    if (checklistItems.length < 5) {
      setChecklistItems([...checklistItems, { text: '', completed: false }])
    }
  }

  const removeChecklistItem = (index: number) => {
    if (checklistItems.length > 1) {
      const newItems = [...checklistItems]
      newItems.splice(index, 1)
      setChecklistItems(newItems)
    }
  }

  if (isEditing) {
    return (
      <Card className="transition-colors border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Edit Task</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`edit-title-${todo._id}`}>Task Title</Label>
              <Input
                id={`edit-title-${todo._id}`}
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors?.title ? 'border-red-500' : ''}
              />
              {errors?.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span>Checklist </span>
                {errors?.checklistItems && (
                  <span className="text-sm text-red-500">
                    {errors.checklistItems}
                  </span>
                )}
              </Label>

              <div className="space-y-2">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Checklist ${index + 1}...`}
                      value={item.text}
                      onChange={(e) =>
                        handleChecklistItemChange(index, e.target.value)
                      }
                      className={cn(
                        'flex-1',
                        Array.isArray(errors?.checklistItems) &&
                          errors?.checklistItems[index]
                          ? 'border-red-500'
                          : '',
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeChecklistItem(index)}
                      disabled={checklistItems.length <= 1}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">
                        Remove checklistItems item
                      </span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addChecklistItem}
              disabled={checklistItems.length >= 5}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
          <Button isLoading={btnLoading} type="button" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </CardFooter>
        {checklistItems.length >= 5 && (
          <div className="px-6 pb-4">
            <Alert variant="default" className="bg-amber-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Maximum 5 checklists items allowed
              </AlertDescription>
            </Alert>
          </div>
        )}
      </Card>
    )
  }

  return (
    <Card
      className={`transition-colors ${deleteLoading ? 'pointer-events-none  opacity-50' : ''}`}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-medium">{todo.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {completedItems} of {totalItems} completed
            </p>
          </div>

          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit task</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeTodo(todo._id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 pb-4">
        <CardTitle className="text-lg font-medium mb-[5px]">
          Checklists
        </CardTitle>

        <div className="space-y-2">
          <ChecklistItemComponent todoId={todo._id} checklistItems={todo.checklistItems} />
        </div>
      </CardContent>
    </Card>
  )
}
