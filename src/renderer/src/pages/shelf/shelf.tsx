import { SidebarInset } from '@renderer/components/ui/sidebar'
import { Shelf } from '@renderer/types'
import BookOnShelf from './book'
import Header from '@renderer/components/header'
import { Frown, Library } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { Input } from '@renderer/components/ui/input'

export default function ShelfPage({ shelf }: { shelf: Shelf }) {
  return (
    <SidebarInset>
      <Header
        path={['The Library', 'My Shelves', shelf.name]}
        rightElements={[
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:text-neutral-50">
              <DialogHeader>
                <DialogTitle>Add A Book To The {shelf.name} Shelf</DialogTitle>
              </DialogHeader>
              <Input
                type="file"
                accept='.epub'
                onChange={async (e) => {
                  if (!e.target.files) return
                  console.log(e.target.files[0].path)
                }}
              />
              <div className="flex gap-2">
                <div className="flex-grow" />
                <DialogClose asChild>
                  <Button>Done</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ]}
      />
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
