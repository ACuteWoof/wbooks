import { useSidebar } from '@renderer/components/ui/sidebar'
import { Book } from '@renderer/types'
import { useEffect } from 'react'

export default function Viewer({ book }: { book: Book }) {
  const { toggleSidebar } = useSidebar()
  useEffect(() => {
    toggleSidebar()
  }, [])
  return <div />
}
