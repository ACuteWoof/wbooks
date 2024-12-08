import BookOnShelf from './book'
import { Frown, Library } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { HeaderContext, ShelfContext, ShelvesContext } from '@renderer/contexts'
import { AnimatePresence, motion } from 'motion/react'
import AddBook from './addbook'

export function useShelf() {
  const [shelves] = useContext(ShelvesContext)
  const [shelfId] = useContext(ShelfContext)

  return shelves[shelfId]
}

export default function ShelfPage() {
  const [headerProps, setHeaderProps] = useContext(HeaderContext)
  const shelf = useShelf()

  useEffect(() => {
    console.log('Shelf effect')
    setHeaderProps({
      ...headerProps,
      visible: true,
      path: ['The Library', 'My Shelves', shelf.name],
      rightElements: [<AddBook />]
    })
  }, [shelf])

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
