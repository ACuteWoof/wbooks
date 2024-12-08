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
import { AnimatePresence, motion } from 'motion/react'

export default function AddBook() {
  const [shelves, setShelves] = useContext(ShelvesContext)
  const [shelfIndex] = useContext(ShelfContext)
  const [customText, setCustomText] = useState<string>()
  const [newBook, setNewBook] = useState<Book>()
  const shelf = useShelf()

  return (
    <Dialog
      onOpenChange={(o) => {
        if (!o) {
          setNewBook(undefined)
          setCustomText(undefined)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:text-neutral-50 w-full max-w-screen-md">
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
            setNewBook(undefined)
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
        <div className="flex items-center justify-between overflow-hidden max-h-96">
          <label htmlFor="fileupload" className="w-fit max-w-64 relative">
            {newBook ? (
              [
                <div className="p-8 prose-h1:text-xl prose-p:text-sm absolute top-0 w-full h-full transition-all bg-neutral-200/90 dark:bg-neutral-800/90 duration-200 backdrop-blur opacity-0 hover:opacity-100 flex flex-col items-center">
                  <div className="flex-grow flex justify-center items-center">
                    <Plus className="h-14 w-14" />
                  </div>
                  <h1 className="break-words">Choose File</h1>
                </div>,
                <TheBook
                  book={newBook}
                  shelf={shelfIndex}
                  className="max-h-96 max-w-64 overflow-hidden"
                  displayOnly={true}
                />
              ]
            ) : (
              <div className="prose-h1:text-2xl prose-p:text-sm flex flex-col justify-between cursor-pointer bg-neutral-200 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-all duration-200 h-96 w-64 p-8 border-2 items-center">
                <div className="flex-grow flex justify-center items-center">
                  <Plus className="h-14 w-14" />
                </div>
                <h1 className="break-words">Choose File</h1>
              </div>
            )}
          </label>
          <div className="relative prose dark:prose-invert px-8 overflow-auto h-96 w-full">
            <AnimatePresence>
              {newBook
                ? [
                    <motion.h2
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                      exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
                      key={newBook.name}
                    >
                      {newBook.name}
                    </motion.h2>,
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                      exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
                      key={newBook.author + newBook.year}
                    >
                      {newBook.author}, {newBook.year}
                    </motion.p>,
                    newBook.desc && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                        exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
                        key={newBook.desc}
                        dangerouslySetInnerHTML={{ __html: newBook.desc }}
                      ></motion.p>
                    )
                  ]
                : [
                    <motion.h2
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                      exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
                      key={'Choose a file'}
                    >
                      Choose a file
                    </motion.h2>,
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                      exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
                      key={
                        'Choose a file to view the metadata of the file here, then click done to add the book.'
                      }
                    >
                      Choose a file to view the metadata of the file here, then click done to add
                      the book.
                    </motion.p>
                  ]}
            </AnimatePresence>
          </div>
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
              Add
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
