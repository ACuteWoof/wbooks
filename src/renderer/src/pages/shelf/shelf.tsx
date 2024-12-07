import { Shelf } from '@renderer/types'
import BookOnShelf from './book'
import { Frown, Library, Plus } from 'lucide-react'
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
import { useContext, useEffect, useState } from 'react'
import ePub from 'epubjs'
import { HeaderContext, ShelfContext, ShelvesContext } from '@renderer/contexts'
import { AnimatePresence, motion } from 'motion/react'

export default function ShelfPage({ shelf }: { shelf: Shelf }) {
  const [newBookPath, setNewBookPath] = useState<string>()
  const [newBookCover, setNewBookCover] = useState<Blob>()
  const [shelves, setShelves] = useContext(ShelvesContext)
  const [shelfIndex] = useContext(ShelfContext)
  const [customText, setCustomText] = useState<string>()
  const [headerProps, setHeaderProps] = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({
      ...headerProps,
      visible: true,
      path: ['The Library', 'My Shelves', shelf.name],
      rightElements: [
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
              onChange={async (e) => {
                if (!e.target.files) return
                const path = e.target.files[0].path

                if (shelf.books.find((bo) => bo.location === path)) {
                  setCustomText('There is already a book in this shelf referring to this file.')
                  return
                }

                setCustomText(undefined)

                setNewBookPath(path)
                const ebook = ePub('file://' + path)
                const coverUrl = await ebook.coverUrl()
                const coverBlobUrl = await (await fetch(coverUrl!)).blob()
                setNewBookCover(coverBlobUrl)
              }}
            />
            <img
              src={newBookCover ? URL.createObjectURL(newBookCover) : ''}
              className="max-h-48 max-w-48"
            />
            <div className="flex gap-2">
              <div className="items-center flex flex-grow text-sm text-neutral-700 dark:text-neutral-300">
                {customText}
              </div>
              <DialogClose asChild>
                <Button
                  disabled={!newBookPath}
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
      ]
    })
  }, [shelf, customText, newBookPath, newBookCover])

  return (
    <motion.div
      key={'shelf'}
      initial={{ opacity: 0, x: -10 }}
      exit={{ opacity: 0, x: 10 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.1
        }
      }}
      transition={{ duration: 0.1, ease: 'linear' }}
      className="w-full"
    >
      <motion.div className="p-12 prose dark:prose-invert !max-w-none">
        <h1 className="flex gap-4 text-5xl items-end">
          <Library className="h-14 w-14" />
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: '-20%' }}
              animate={{
                display: 'block',
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2
                }
              }}
              exit={{ opacity: 0, y: '20%' }}
              transition={{ duration: 0.1, ease: 'linear' }}
              key={shelf.name}
            >
              {shelf.name}
            </motion.div>
          </AnimatePresence>
        </h1>
        <motion.div className="items-start w-full flex flex-wrap gap-8">
          {shelf.books.length === 0 && (
            <h3 className="flex gap-4 items-center">
              <Frown /> No books here yet.
            </h3>
          )}
          {shelf.books.map((book, i) => (
            <motion.div
              key={book.location}
              initial={{ opacity: 0, x: -10 }}
              exit={{ opacity: 0, x: 10, transition: { delay: 0 } }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.2 + 0.1 * i, duration: 0.3 }
              }}
              transition={{ duration: 0.1 }}
            >
              <BookOnShelf book={book} className="max-h-96" key={book.location} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
