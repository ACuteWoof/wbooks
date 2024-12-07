import { useSidebar } from '@renderer/components/ui/sidebar'
import { HeaderContext, ShelfContext, ShelvesContext } from '@renderer/contexts'
import { Book } from '@renderer/types'
import { useContext, useEffect } from 'react'

export default function Viewer({ book }: { book: Book }) {
  const { toggleSidebar } = useSidebar()
  const [shelf] = useContext(ShelfContext)
  const [shelves] = useContext(ShelvesContext)
  const [headerProps, setHeaderProps] = useContext(HeaderContext)

  useEffect(() => {
    toggleSidebar()
    setHeaderProps({
      ...headerProps,
      visible: false,
      path: ['The Library', 'My Shelves', shelves[shelf].name, book.name],
      rightElements: []
    })
  }, [])
  return <div />
}
