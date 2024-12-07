import { Calendar, ChevronLeft, ChevronRight, Earth, Home, Library, Plus } from 'lucide-react'
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
import { useContext, useEffect, useState } from 'react'
import { PageContext, ShelfContext, ShelvesContext, TableOfContentsContext } from './contexts'
import { Shelf } from './types'
import { HiOutlineLibrary } from 'react-icons/hi'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './components/ui/dialog'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from './components/ui/context-menu'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from './components/ui/alert-dialog'

export default function TheSidebar() {
  const [shelvesVisible, setShelvesVisible] = useState<boolean>(false)
  const [toc] = useContext(TableOfContentsContext)
  const [page, setPage] = useContext(PageContext)
  const [, setShelf] = useContext(ShelfContext)
  const [shelves, setShelves] = useContext(ShelvesContext)
  const [newShelfName, setNewShelfName] = useState<string>()
  const [applicationVisible, setApplicationVisible] = useState<boolean>(true)

  useEffect(() => {
    if (page === 0) setApplicationVisible(false)
  }, [page])

  return (
    <Sidebar className="max-h-screen overflow-y-auto">
      <SidebarContent className="flex">
        <AnimatePresence>
          {page === 0 && (
            <motion.div
              key="toc"
              initial={{
                height: 0
              }}
              animate={{
                height: 'auto',
                flexGrow: 1
              }}
              exit={{
                height: 0,
                flexGrow: 0
              }}
              transition={{
                duration: 0.1
              }}
              className={'overflow-auto ' + (page !== 0 ? 'overflow-hidden' : '')}
            >
              <SidebarGroup>
                <SidebarGroupLabel>Table Of Contents</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>{toc}</SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </motion.div>
          )}
        </AnimatePresence>
        <Collapsible
          className="group/applicationcollapse"
          onOpenChange={(o) => {
            setApplicationVisible(o)
          }}
          open={page === 0 ? applicationVisible : true}
        >
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel>
                {page === 0 && (
                  <ChevronRight className="mr-2 transition-transform duration-200 group-data-[state=open]/applicationcollapse:rotate-90" />
                )}
                Application
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <AnimatePresence>
              {(applicationVisible || page != 0) && (
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
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => {
                            setPage(1)
                          }}
                        >
                          <Home /> Lobby
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
                                      <AlertDialog>
                                        <ContextMenu>
                                          <ContextMenuTrigger>
                                            <SidebarMenuButton
                                              onClick={() => {
                                                setPage(2)
                                                setShelf(i)
                                              }}
                                            >
                                              <Library />
                                              {s.name}
                                            </SidebarMenuButton>
                                          </ContextMenuTrigger>
                                          <ContextMenuContent>
                                            <AlertDialogTrigger asChild>
                                              <ContextMenuItem>Remove</ContextMenuItem>
                                            </AlertDialogTrigger>
                                          </ContextMenuContent>
                                        </ContextMenu>
                                        <AlertDialogContent className="dark:dark dark:text-neutral-50">
                                          <AlertDialogTitle>
                                            Are you sure you want to delete{' '}
                                            <span className="italic">{s.name ?? ''}</span>?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be reversed. Your books will remain
                                            in their directories, but there will be no reference to
                                            them here.
                                          </AlertDialogDescription>
                                          <div className="flex w-full gap-2">
                                            <div className="mr-auto" />
                                            <AlertDialogCancel asChild>
                                              <Button variant="outline">Cancel</Button>
                                            </AlertDialogCancel>
                                            <Button
                                              variant="destructive"
                                              asChild
                                              onClick={() => {
                                                setShelves(shelves.filter((x) => x !== s))
                                              }}
                                            >
                                              <AlertDialogCancel>Remove</AlertDialogCancel>
                                            </Button>
                                          </div>
                                        </AlertDialogContent>
                                      </AlertDialog>
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
                                      <DialogContent className="dark:text-neutral-50">
                                        <DialogHeader>
                                          <DialogTitle>Add New Shelf</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-1.5">
                                          <Label>Shelf Name</Label>
                                          <Input
                                            placeholder="Fiction"
                                            onChange={(e) => {
                                              setNewShelfName(e.target.value)
                                            }}
                                          />
                                        </div>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button
                                              disabled={!newShelfName}
                                              onClick={() => {
                                                if (!newShelfName) return
                                                setShelves([
                                                  ...shelves,
                                                  { name: newShelfName, books: [] }
                                                ])
                                              }}
                                            >
                                              Create Shelf
                                            </Button>
                                          </DialogClose>
                                        </DialogFooter>
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
                </motion.div>
              )}
            </AnimatePresence>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  )
}
