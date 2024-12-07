import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@renderer/components/ui/sidebar'
import {
  HeaderContext,
  ShelfContext,
  ShelvesContext,
  TableOfContentsContext
} from '@renderer/contexts'
import { Book } from '@renderer/types'
import { useContext, useEffect } from 'react'
import ePub from 'epubjs'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@renderer/components/ui/collapsible'

export default function Viewer({ book }: { book: Book }) {
  const { toggleSidebar } = useSidebar()
  const [shelf] = useContext(ShelfContext)
  const [shelves] = useContext(ShelvesContext)
  const [headerProps, setHeaderProps] = useContext(HeaderContext)
  const [toc, setToc] = useContext(TableOfContentsContext)

  useEffect(() => {
    console.log('use effect running')
    toggleSidebar()
    setHeaderProps({
      ...headerProps,
      visible: false,
      path: ['The Library', 'My Shelves', shelves[shelf].name, book.name],
      rightElements: []
    })

    const ebook = ePub('file://' + book.location)
    console.log(ebook)
    ebook.loaded.navigation.then((navigation) => {
      setToc(
        navigation.toc.map((nav) => {
          if (nav.subitems) {
            return (
              <SidebarMenuItem>
                <SidebarMenuButton className="py-1 h-fit text-wrap">
                  {nav.label.trim()}
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {
                    //{nav.subitems.map((nav) => (
                    //  <SidebarMenuSubItem>
                    //    <SidebarMenuSubButton className="py-1 h-fit text-wrap">
                    //      {nav.label}
                    //    </SidebarMenuSubButton>
                    //  </SidebarMenuSubItem>
                    //))}
                  }
                </SidebarMenuSub>
              </SidebarMenuItem>
            )
          }

          return (
            <SidebarMenuItem>
              <SidebarMenuButton>{nav.label.trim()}</SidebarMenuButton>
            </SidebarMenuItem>
          )
        })
      )
    })
  }, [book])

  useEffect(() => {
    console.log(toc)
  }, [toc])

  return <div />
}
