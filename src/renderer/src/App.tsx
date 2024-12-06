import { useState } from 'react'
import { SidebarProvider } from './components/ui/sidebar'
import TheSidebar from './thesidebar'
import { BookContext, PageContext, ShelfContext, ShelvesContext } from './contexts'
import { Book, Shelf } from './types'
import ShelfPage from './pages/shelf/shelf'
import Viewer from './pages/viewer/viewer'
import Home from './pages/home/home'
import { ThemeProvider } from './components/theme-provider'

export default function App() {
  const sampleBook: Book = {
    name: 'The Trinity',
    author: 'St. Augustine',
    year: 417,
    location: '/home/acutewoof/Basement/Books/the-trinity.epub'
  }

  const [page, setPage] = useState<number>(1)
  const [shelf, setShelf] = useState<number>(0)
  const [currentBook, setCurrentBook] = useState<Book>()
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
    <div className="w-full h-full">
      {currentBook ? (
        <Viewer book={currentBook} />
      ) : (
        <h1 className="text-7xl">Pick a book to view.</h1>
      )}
    </div>,
    // `pages` is used to index these, in order as appears on the sidebar
    <Home />,
    <ShelfPage shelf={shelves[shelf]} />,
    <div />,
    <div />,
    <div />,
    <div />,
    <div />,
    <div />
  ]

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <SidebarProvider>
        <BookContext.Provider value={[currentBook, setCurrentBook]}>
          <ShelfContext.Provider value={[shelf, setShelf]}>
            <ShelvesContext.Provider value={[shelves, setShelves]}>
              <PageContext.Provider value={[page, setPage]}>
                <div className="m-0 flex dark:bg-neutral-950 dark:text-neutral-50 min-h-screen w-screen">
                  <TheSidebar />
                  {pages[page]}
                </div>
              </PageContext.Provider>
            </ShelvesContext.Provider>
          </ShelfContext.Provider>
        </BookContext.Provider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
