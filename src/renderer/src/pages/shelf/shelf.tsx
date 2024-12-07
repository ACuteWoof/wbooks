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
import { useContext, useState } from 'react'
import ePub from 'epubjs'
import { ShelfContext, ShelvesContext } from '@renderer/contexts'

export default function ShelfPage({ shelf }: { shelf: Shelf }) {
  const [newBookPath, setNewBookPath] = useState<string>()
  const [newBookCover, setNewBookCover] = useState<Blob>()
  const [shelves, setShelves] = useContext(ShelvesContext)
  const [shelfIndex] = useContext(ShelfContext)

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
                accept=".epub"
                onChange={async (e) => {
                  if (!e.target.files) return
                  const path = e.target.files[0].path
                  setNewBookPath(path)
                  const ebook = ePub('file://' + path)
                  const coverUrl = await ebook.coverUrl()
                  console.log(coverUrl)
                  const coverBlobUrl = await (await fetch(coverUrl!)).blob()
                  setNewBookCover(coverBlobUrl)
                }}
              />
              <img
                src={newBookCover ? URL.createObjectURL(newBookCover) : ''}
                className="max-h-48 max-w-48"
              />
              <div className="flex gap-2">
                <div className="flex-grow" />
                <DialogClose asChild>
                  <Button
                    onClick={async () => {
                      if (!newBookPath) return
                      const ebook = { ...ePub('file://' + newBookPath) }
                      console.log(ebook)
                      const newBook = {
                        name: (await ebook.loaded.metadata).title,
                        author: (await ebook.loaded.metadata).creator,
                        location: newBookPath,
                        year: +(await ebook.loaded.metadata).pubdate.split('-')[0],
                        desc: (await ebook.loaded.metadata).description
                      }

                      const newShelves = [...shelves]
                      newShelves[shelfIndex].books = [newBook, ...shelf.books]
                      setShelves(newShelves)
                      setNewBookCover(undefined)
                      setNewBookPath(undefined)
                    }}
                  >
                    Done
                  </Button>
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
            <BookOnShelf book={book} className='max-h-96' />
          ))}
        </div>
      </div>
    </SidebarInset>
  )
}
