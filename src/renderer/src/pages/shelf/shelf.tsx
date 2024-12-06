import { SidebarTrigger } from '@renderer/components/ui/sidebar'
import { Shelf } from '@renderer/types'

export default function ShelfPage({ shelf }: { shelf: Shelf }) {
  return (
    <div className="p-2">
      <SidebarTrigger />
      <div className="p-10 prose dark:prose-invert !max-w-none">
        <h1 className="text-5xl">The {shelf.name} Shelf</h1>
      </div>
    </div>
  )
}
