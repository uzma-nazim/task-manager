import { HeaderDropdown } from '@/components/header-dropdown'
import TaskApp from '@/components/task-app'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="bg-gradient-to-br">
      <div className="pt-[10px] ml-[auto] mr-[10px]  w-[max-content]">
        <HeaderDropdown />
      </div>
      <div className="min-h-screen flex items-center justify-center p-6  from-slate-50 to-slate-100 ">
        <TaskApp />
      </div>
    </main>
  )
}
