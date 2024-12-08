import { Plus } from 'lucide-react'
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
import { useShelf } from './shelf'
import { TheBook } from './book'
import { Book } from '../../types'

export default function AddBook() {
  const [shelves, setShelves] = useContext(ShelvesContext)
  const [shelfIndex] = useContext(ShelfContext)
  const [customText, setCustomText] = useState<string>()
  const [newBook, setNewBook] = useState<Book>()
  const shelf = useShelf()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:text-neutral-50">
        <DialogHeader>
          <DialogTitle>
            Add a book to <em>{shelf.name}</em>
          </DialogTitle>
        </DialogHeader>
        <Input
          type="file"
          accept=".epub"
          id="fileupload"
          onChange={async (e) => {
            if (!e.target.files) return
            const path = e.target.files[0].path

            if (shelf.books.find((bo) => bo.location === path)) {
              setCustomText('There is already a book in this shelf referring to this file.')
              return
            }

            setCustomText(undefined)

            const ebook = ePub('file://' + path)
            setNewBook({
              name: (await ebook.loaded.metadata).title,
              author: (await ebook.loaded.metadata).creator,
              location: path,
              year: +(await ebook.loaded.metadata).pubdate.split('-')[0],
              desc: (await ebook.loaded.metadata).description
            })
          }}
          className="hidden"
        />
        <div className="flex items-center justify-center">
          <label htmlFor="fileupload">
            {newBook ? (
              <TheBook book={newBook} shelf={shelfIndex} className="max-h-96" displayOnly={true} />
            ) : (
              <div
                className={`prose-h1:text-2xl prose-p:text-sm flex flex-col justify-between cursor-pointer bg-neutral-200 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-all duration-200 h-96 w-64 p-8 border-2 `}
              >
                <h1 className="break-words">Choose File</h1>
              </div>
            )}
          </label>
        </div>
        <div className="flex gap-2">
          <div className="items-center flex flex-grow text-sm text-neutral-700 dark:text-neutral-300">
            {customText}
          </div>
          <DialogClose asChild>
            <Button
              disabled={!newBook}
              onClick={async () => {
                if (!newBook) return

                const newShelves = [...shelves]
                newShelves[shelfIndex].books = [newBook, ...shelf.books]
                setShelves(newShelves)
                setNewBook(undefined)
              }}
            >
              Done
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
