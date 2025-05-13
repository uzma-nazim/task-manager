'use client'

import type React from 'react'
import { useState } from 'react'
// import { useTodoStore } from "@/lib/store"

// import { validateTodo, type ValidationError } from "@/lib/validation"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, ListChecks, AlertCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { useTodoStore } from '@/store/store'
import {
  todoSchema,
  validateTodo,
  type ValidationError,
} from '@/validation/schema'
// import { validateTodo, type ValidationError } from "@/validation/schema"

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [checklistItems, setChecklistItems] = useState<string[]>([''])
  const [errors, setErrors] = useState<ValidationError | null>(null)
  const [buttonLoading, setbuttonLoading] = useState(false)
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty checklist items
    const filteredItems = checklistItems.filter((item) => item.trim() !== '')

    const validationErrors = validateTodo(
      { title, checklistItems: filteredItems },
      todoSchema,
    )

    if (validationErrors?.errors) {
      setErrors(validationErrors.errors)
      return
    }
    setbuttonLoading(true)
    await addTodo(title, filteredItems)
    setTitle('')
    setChecklistItems([''])
    setErrors(null)
    setbuttonLoading(false)
  }

  const handleChecklistItemChange = (index: number, value: string) => {
    const newItems = [...checklistItems]
    newItems[index] = value
    setChecklistItems(newItems)
  }

  const addChecklistItem = () => {
    if (checklistItems.length < 5) {
      setChecklistItems([...checklistItems, ''])
    }
  }

  const removeChecklistItem = (index: number) => {
    if (checklistItems.length > 1) {
      const newItems = [...checklistItems]
      newItems.splice(index, 1)
      setChecklistItems(newItems)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Create New Task</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <form id="todo-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
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
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1">
                <ListChecks className="h-4 w-4" />
                <span>Checklist</span>
              </Label>
              {errors?.checklistItems && (
                <p className="text-sm text-red-500">{errors.checklistItems}</p>
              )}
            </div>

            <div className="space-y-2">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Checklist ${index + 1}...`}
                    value={item}
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
                    <span className="sr-only">Remove checklist item</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addChecklistItem}
          disabled={checklistItems.length >= 5}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
        <Button type="submit" form="todo-form"isLoading={buttonLoading}>
          Create Task
        </Button>
      </CardFooter>
      {checklistItems.length >= 5 && (
        <div className="px-6 pb-4">
          <Alert variant="default" className="bg-amber-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Maximum 5 checklist items allowed
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  )
}
