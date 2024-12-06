import { SidebarInset } from '@renderer/components/ui/sidebar'
import { Shelf } from '@renderer/types'
import BookOnShelf from './book'
import Header from '@renderer/components/header'
import { Frown, Library } from 'lucide-react'

export default function ShelfPage({ shelf }: { shelf: Shelf }) {
  return (
    <SidebarInset>
      <Header path={['The Library', 'My Shelves', shelf.name]} />
      <div className="p-12 prose dark:prose-invert !max-w-none">
        <h1 className="text-5xl flex gap-4 items-end">
          <Library className="h-14 w-14" /> {shelf.name}
        </h1>
        <div className="items-start w-full flex flex-wrap gap-8">
          {shelf.books.length === 0 && (
            <h3 className="flex gap-4 items-center">
              <Frown /> No books here yet.
            </h3>
          )}
          {shelf.books.map((book) => (
            <BookOnShelf book={book} />
          ))}
        </div>
      </div>
    </SidebarInset>
  )
}
