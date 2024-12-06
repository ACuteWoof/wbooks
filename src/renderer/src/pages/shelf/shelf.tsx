import { SidebarInset } from '@renderer/components/ui/sidebar'
import { Shelf } from '@renderer/types'
import BookOnShelf from './book'
import Header from '@renderer/components/header'

export default function ShelfPage({ shelf }: { shelf: Shelf }) {
  return (
    <SidebarInset>
      <Header path={['The Library', 'My Shelves', shelf.name]} />
      <div className="p-8 prose dark:prose-invert !max-w-none">
        <h1 className="text-7xl">{shelf.name}</h1>
        <div className="items-start w-full flex flex-wrap gap-4">
          {shelf.books.map((book) => (
            <BookOnShelf book={book} />
          ))}
        </div>
      </div>
    </SidebarInset>
  )
}
