import { ReactNode, useEffect, useState } from 'react'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import TheSidebar from './thesidebar'
import {
  BookContext,
  HeaderContext,
  PageContext,
  ShelfContext,
  ShelvesContext,
  TableOfContentsContext
} from './contexts'
import { Book, HeaderContextProps, Shelf } from './types'
import ShelfPage from './pages/shelf/shelf'
import Viewer from './pages/viewer/viewer'
import Home from './pages/home/home'
import { ThemeProvider } from './components/theme-provider'
import Header from './components/header'
import { AnimatePresence, motion } from 'motion/react'

export default function App() {
  const [page, setPage] = useState<number>(1)
  const [shelf, setShelf] = useState<number>(0)
  const [currentBook, setCurrentBook] = useState<Book>()
  const [headerProps, setHeaderProps] = useState<HeaderContextProps>({
    visible: true,
    previousPathLength: 2,
    path: ['The Library', 'Lobby']
  })
  const [toc, setToc] = useState<ReactNode[]>([])
  const [shelves, setShelves] = useState<Shelf[]>(
    JSON.parse(localStorage.getItem('shelves') ?? JSON.stringify([]))
  )

  const pages = [
    <div className="w-full h-full" key="viewer">
      {currentBook ? (
        <Viewer book={currentBook} />
      ) : (
        <h1 className="text-7xl">Pick a book to view.</h1>
      )}
    </div>,
    // `pages` is used to index these, in order as appears on the sidebar
    <motion.div
      key={'home'}
      initial={{ x: -30 }}
      exit={{ x: 30 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.1, ease: 'linear', stiffness: 0 }}
    >
      <Home />
    </motion.div>,
 <motion.div
      key={'shelf'}
      initial={{ opacity: 0, x: -30 }}
      exit={{ opacity: 0, x: 30 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.1
        }
      }}
      transition={{ duration: 0.1, ease: 'linear' }}
      className="w-full"
    >
    <ShelfPage />
    </motion.div>
    ,
    <div className="text-7xl w-full h-full flex items-center justify-center">WIP</div>,
    <div className="text-7xl w-full h-full flex items-center justify-center">WIP</div>
  ]

  useEffect(() => {
    localStorage.setItem('shelves', JSON.stringify(shelves))
  }, [shelves])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <SidebarProvider>
        <TableOfContentsContext.Provider value={[toc, setToc]}>
          <HeaderContext.Provider value={[headerProps, setHeaderProps]}>
            <BookContext.Provider value={[currentBook, setCurrentBook]}>
              <ShelfContext.Provider value={[shelf, setShelf]}>
                <ShelvesContext.Provider value={[shelves, setShelves]}>
                  <PageContext.Provider value={[page, setPage]}>
                    <div className="relative m-0 flex dark:bg-neutral-950 dark:text-neutral-50 min-h-screen w-screen">
                      <TheSidebar />
                      <SidebarInset>
                        <Header />
                        <AnimatePresence>{pages[page]}</AnimatePresence>
                      </SidebarInset>
                    </div>
                  </PageContext.Provider>
                </ShelvesContext.Provider>
              </ShelfContext.Provider>
            </BookContext.Provider>
          </HeaderContext.Provider>
        </TableOfContentsContext.Provider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
