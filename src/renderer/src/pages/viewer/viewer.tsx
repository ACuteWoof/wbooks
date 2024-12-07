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
import { useContext, useEffect, useState } from 'react'
import ePub from 'epubjs'
import { NavItem } from 'epubjs/types/navigation'
import { ChevronRight, Dot } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

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
            return <NavigationItem nav={nav} />
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

function SubNavigation({ nav, level }: { nav: NavItem; level: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        className="cursor-pointer py-1 h-fit text-wrap"
        onClick={() => {
          if (!nav.subitems || nav.subitems.length === 0) return
          setIsOpen(!isOpen)
        }}
      >
        {nav.subitems && nav.subitems.length > 0 ? (
          <motion.span
            animate={{
              rotate: isOpen ? 90 : 0
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center size-4"
          >
            <ChevronRight />
          </motion.span>
        ) : (
          <Dot className="text-neutral-100 dark:text-neutral-500" />
        )}
        {nav.label}
      </SidebarMenuSubButton>
      {nav.subitems && nav.subitems.length > 0 && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key={'collapse'}
              initial={{
                height: 0
              }}
              animate={{
                height: 'auto'
              }}
              exit={{
                height: 0
              }}
              transition={{
                duration: 0.1
              }}
              className="overflow-hidden"
            >
              <SidebarMenuSub className="mr-0">
                {nav.subitems.map((nav) => (
                  <SubNavigation nav={nav} level={level + 1} />
                ))}
              </SidebarMenuSub>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </SidebarMenuSubItem>
  )
}

function NavigationItem({ nav }: { nav: NavItem }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="py-1 h-fit text-wrap"
        onClick={() => {
          if (!nav.subitems || nav.subitems.length === 0) return
          setIsOpen(!isOpen)
        }}
      >
        {nav.subitems && nav.subitems.length > 0 ? (
          <motion.span
            animate={{
              rotate: isOpen ? 90 : 0
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center size-4"
          >
            <ChevronRight className="" />
          </motion.span>
        ) : (
          <Dot className="text-neutral-200 dark:text-neutral-500" />
        )}
        {nav.label.trim()}
      </SidebarMenuButton>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="collapsehighest"
            initial={{
              height: 0
            }}
            animate={{
              height: 'auto'
            }}
            exit={{
              height: 0
            }}
            transition={{
              duration: 0.1
            }}
            className="overflow-hidden"
          >
            <SidebarMenuSub className="mr-0">
              {nav.subitems!.map((nav, i) => (
                <SubNavigation nav={nav} level={i * 10000} />
              ))}
            </SidebarMenuSub>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarMenuItem>
  )
}
