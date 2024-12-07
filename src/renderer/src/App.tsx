import { useEffect, useState } from 'react'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import TheSidebar from './thesidebar'
import { BookContext, HeaderContext, PageContext, ShelfContext, ShelvesContext } from './contexts'
import { Book, HeaderContextProps, Shelf } from './types'
import ShelfPage from './pages/shelf/shelf'
import Viewer from './pages/viewer/viewer'
import Home from './pages/home/home'
import { ThemeProvider } from './components/theme-provider'
import { AnimatePresence } from 'motion/react'
import Header from './components/header'

export default function App() {
  const sampleBook: Book = {
    name: 'Crime And Punishment',
    author: 'Fyodor Dostoevsky',
    year: 10,
    location: '/home/acutewoof/Basement/Books/Crime_and_Punishment.epub'
  }

  const [page, setPage] = useState<number>(1)
  const [shelf, setShelf] = useState<number>(0)
  const [currentBook, setCurrentBook] = useState<Book>()
  const [headerProps, setHeaderProps] = useState<HeaderContextProps>({ visible: true })
  const [shelves, setShelves] = useState<Shelf[]>(
    JSON.parse(
      localStorage.getItem('shelves') ??
        JSON.stringify([
          {
            name: 'The Unshelved Shelf',
            books: new Array(10).fill(sampleBook)
          },
          {
            name: 'The Unshelved Shelf',
            books: new Array(10).fill(sampleBook)
          },
          {
            name: 'The Unshelved Shelf',
            books: new Array(10).fill(sampleBook)
          },
          {
            name: 'The Unshelved Shelf',
            books: new Array(10).fill(sampleBook)
          },
          {
            name: 'The Unshelved Shelf',
            books: new Array(10).fill(sampleBook)
          }
        ])
    )
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
    <Home key="home" />,
    <ShelfPage shelf={shelves[shelf]} />,
    <div />,
    <div />,
    <div />,
    <div />,
    <div />,
    <div />
  ]

  useEffect(() => {
    localStorage.setItem('shelves', JSON.stringify(shelves))
  }, [shelves])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <SidebarProvider>
        <HeaderContext.Provider value={[headerProps, setHeaderProps]}>
          <BookContext.Provider value={[currentBook, setCurrentBook]}>
            <ShelfContext.Provider value={[shelf, setShelf]}>
              <ShelvesContext.Provider value={[shelves, setShelves]}>
                <PageContext.Provider value={[page, setPage]}>
                  <div className="relative m-0 flex dark:bg-neutral-950 dark:text-neutral-50 min-h-screen w-screen">
                    <TheSidebar />
                    <SidebarInset>
                      <AnimatePresence>
                        {headerProps.visible && (
                          <Header
                            path={headerProps.path ?? ['The Library']}
                            rightElements={headerProps.rightElements}
                          />
                        )}
                        {pages[page]}
                      </AnimatePresence>
                    </SidebarInset>
                  </div>
                </PageContext.Provider>
              </ShelvesContext.Provider>
            </ShelfContext.Provider>
          </BookContext.Provider>
        </HeaderContext.Provider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
