import { useState } from 'react'
import { SidebarProvider } from './components/ui/sidebar'
import TheSidebar from './thesidebar'
import { PageContext, ShelfContext, ShelvesContext } from './contexts'
import { Shelf } from './types'
import ShelfPage from './pages/shelf/shelf'

export default function App() {
  const [page, setPage] = useState<number>(1)
  const [shelf, setShelf] = useState<number>(0)
  const [shelves, setShelves] = useState<Shelf[]>(
    JSON.parse(
      localStorage.getItem('shelves') ??
        JSON.stringify([
          {
            name: 'Unshelved',
            books: []
          }
        ])
    )
  )

  const pages = [
    <div>kjslkfsjlf</div>, // reserved viewer
    // `pages` is used to index these, in order as appears on the sidebar
    <div>Home</div>,
    <ShelfPage shelf={shelves[shelf]} />,
    <div />,
    <div />,
    <div />,
    <div />,
    <div />,
    <div />
  ]

  return (
    <SidebarProvider>
      <ShelfContext.Provider value={[shelf, setShelf]}>
        <ShelvesContext.Provider value={[shelves, setShelves]}>
          <PageContext.Provider value={[page, setPage]}>
            <div className="flex dark:bg-neutral-950 dark:text-neutral-50 h-screen w-screen">
              <TheSidebar />
              {pages[page]}
            </div>
          </PageContext.Provider>
        </ShelvesContext.Provider>
      </ShelfContext.Provider>
    </SidebarProvider>
  )
}
