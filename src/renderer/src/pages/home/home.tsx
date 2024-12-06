import Header from '@renderer/components/header'
import { SidebarInset } from '@renderer/components/ui/sidebar'
import { BookContext, PageContext, ShelvesContext } from '@renderer/contexts'
import { Library, LibraryBig } from 'lucide-react'
import { useContext } from 'react'

export default function Home() {
  const [shelves] = useContext(ShelvesContext)
  const [, setPage] = useContext(PageContext)
  const [, setBook] = useContext(BookContext)

  return (
    <SidebarInset>
      <Header path={['The Library']} />
      <div className="prose prose-neutral dark:prose-invert p-12 !max-w-none">
        <h1 className="text-5xl flex gap-4">
          <LibraryBig className="h-12 w-12" /> Your Shelves
        </h1>
        <div className="flex flex-col gap-8">
          {shelves.map((shelf) => (
            <div className="bg-neutral-200 dark:bg-neutral-900 rounded-lg flex flex-col border">
              <div className="flex gap-2 px-8 pt-4 font-bold">
                <Library /> {shelf.name}
              </div>
              <div className="w-full flex-col flex-wrap overflow-auto flex px-8 gap-8 h-64 py-4" id="homeshelf">
                {shelf.books.map((book) => (
                  <img
                    src="https://assets.lulu.com/cover_thumbs/5/7/57gkz9r-front-shortedge-384.jpg"
                    className={'border-2 cursor-pointer max-h-52 max-w-52 m-0'}
                    onClick={() => {
                      setPage(0)
                      setBook(book)
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarInset>
  )
}
