import BookOnShelf from './book'
import { Frown, Library, SearchIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { HeaderContext, ShelfContext, ShelvesContext } from '@renderer/contexts'
import { AnimatePresence, motion } from 'motion/react'
import AddBook from './addbook'
import { Book, Shelf } from '@renderer/types'

export function useShelf() {
  const [shelves] = useContext(ShelvesContext)
  const [shelfId] = useContext(ShelfContext)
  const [shelf, setShelf] = useState<Shelf>(shelves[shelfId])

  useEffect(() => {
    setShelf(shelves[shelfId])
  }, [shelves, shelfId])

  return shelf
}

export default function ShelfPage() {
  const [headerProps, setHeaderProps] = useContext(HeaderContext)
  const [search, setSearch] = useState<string>('')
  const shelf = useShelf()

  useEffect(() => {
    setHeaderProps({
      ...headerProps,
      visible: true,
      path: ['The Library', 'My Shelves', shelf.name],
      rightElements: [
        <AddBook />,
        <div className="flex h-10 w-full rounded-md border border-neutral-200 bg-white pr-2 items-center text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300">
          <input
            className="bg-transparent border-transparent px-3 pl-2 h-10 ring-0 outline-none rounded-md w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            placeholder={'Search ' + shelf.name}
          />
          <SearchIcon />
        </div>
      ]
    })
  }, [shelf, search, setSearch])

  return (
    <motion.div
      key={'shelf'}
      initial={{ opacity: 0, x: -30 }}
      exit={{ opacity: 0, x: 30 }}
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
          {(search.trim() === ''
            ? shelf.books
            : shelf.books.filter(
                (book) =>
                  book.name.toLowerCase().includes(search.toLowerCase()) ||
                  book.desc?.toLowerCase().includes(search.toLowerCase())
              )
          ).length === 0 &&
            shelf.books.length != 0 && (
              <motion.h3
                key={'nobook' + shelf}
                initial={{ opacity: 0, x: -10 }}
                exit={{ opacity: 0, x: 10, transition: { delay: 0 } }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.2, duration: 0.3 }
                }}
                transition={{ duration: 0.1 }}
                className="flex gap-4 items-center"
              >
                <Frown /> No books found for search term {search}
              </motion.h3>
            )}
          {shelf.books.length === 0 && (
            <motion.h3
              key={'nobook' + shelf}
              initial={{ opacity: 0, x: -10 }}
              exit={{ opacity: 0, x: 10, transition: { delay: 0 } }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.2, duration: 0.3 }
              }}
              transition={{ duration: 0.1 }}
              className="flex gap-4 items-center"
            >
              <Frown /> No books here yet.
            </motion.h3>
          )}
          {(search.trim() === ''
            ? shelf.books
            : shelf.books.filter(
                (book) =>
                  book.name.toLowerCase().includes(search.toLowerCase()) ||
                  book.desc?.toLowerCase().includes(search.toLowerCase())
              )
          ).map((book, i) => (
            <motion.div
              key={shelf.name + '/' + book.location}
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
