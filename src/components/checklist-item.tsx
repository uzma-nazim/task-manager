'use client'

import { useTodoStore, type ChecklistItem } from '@/store/store'
import { cn } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useRef, useState } from 'react'

type ChecklistItemProps = {
  checklistItems: ChecklistItem[]
  todoId: string
}

export default function ChecklistItemComponent({
  checklistItems,
  todoId,
}: ChecklistItemProps) {
  const isInitialRender = useRef(true)
  const [checked, setChecked] = useState<(boolean | string)[]>([])

  const debouncedChecked = useDebounce(checked, 700)
  const { toggleChecklistItem, upadateChecklistItem, todos } = useTodoStore()
  const handleCheckboxChange = (index: number, value: string | boolean) => {
    setChecked((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return // Skip the first render
    }
    if (debouncedChecked.length > 0) {
      upadateChecklistItem({
        taskId: todoId,
        items: todos.find((todo) => todo._id === todoId)?.checklistItems || [],
      })
    }
    
  }, [debouncedChecked])

  return checklistItems.map((item, index) => {
    return (
      <div key={index} className="flex items-center gap-2 rounded-md border p-2 hover:bg-accent/50 transition-colors">
        <Checkbox
          checked={item.completed}
          onCheckedChange={(e) => {
            toggleChecklistItem(todoId, item._id)

            handleCheckboxChange(index, e)
          }}
          id="terms"
        />

        <span
          className={cn(
            'flex-1 text-sm transition-all',
            item.completed && 'text-muted-foreground line-through',
          )}
        >
          {item.text}
        </span>
      </div>
    )
  })
}
