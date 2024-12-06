import { Calendar, ChevronLeft, Earth, Home, Library, Plus } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from './components/ui/sidebar'
import { Collapsible, CollapsibleTrigger } from './components/ui/collapsible'
import { AnimatePresence, motion } from 'motion/react'
import { useContext, useState } from 'react'
import { PageContext, ShelfContext, ShelvesContext } from './contexts'
import { Shelf } from './types'
import { HiOutlineLibrary } from 'react-icons/hi'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './components/ui/dialog'

export default function TheSidebar() {
  const [shelvesVisible, setShelvesVisible] = useState<boolean>(false)
  const [shelves] = useContext(ShelvesContext)
  const [, setPage] = useContext(PageContext)
  const [, setShelf] = useContext(ShelfContext)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setPage(1)
                  }}
                >
                  <Home /> Home
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible
                asChild
                className="group/collapsible"
                onOpenChange={(o) => {
                  setShelvesVisible(o)
                }}
                defaultOpen={false}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <HiOutlineLibrary /> Library
                      <ChevronLeft className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <AnimatePresence>
                    {shelvesVisible && (
                      <motion.div
                        key="presenceanimate"
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
                        <SidebarMenuSub>
                          {shelves.map((s: Shelf, i: number) => (
                            <SidebarMenuSubItem>
                              <SidebarMenuButton
                                onClick={() => {
                                  setPage(2)
                                  setShelf(i)
                                }}
                              >
                                <Library />
                                {s.name}
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                          <SidebarMenuSubItem>
                            <Dialog>
                              <DialogTrigger asChild>
                                <SidebarMenuButton>
                                  <Plus />
                                  Add Shelf
                                </SidebarMenuButton>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add New Shelf</DialogTitle>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setPage(3)
                  }}
                >
                  <Calendar />
                  Reading Streak
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setPage(4)
                  }}
                >
                  <Earth />
                  Discover
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
