import { HeaderContext, ShelvesContext } from '@renderer/contexts'
import { Library, LibraryBig } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { TheBook } from '../shelf/book'
import { AnimatePresence, motion } from 'motion/react'

export default function Home() {
  const [headerProps, setHeaderProps] = useContext(HeaderContext)
  const [shelves] = useContext(ShelvesContext)

  useEffect(() => {
    setHeaderProps({
      ...headerProps,
      visible: true,
      path: ['The Library', 'Lobby'],
      rightElements: []
    })
  }, [])

  return [shelves && shelves.length > 0 && <ShelvesSection />]
}

function ShelvesSection() {
  const [shelves] = useContext(ShelvesContext)

  return (
    <div className="prose prose-neutral dark:prose-invert p-12 !max-w-none">
      <h1 className="text-5xl flex gap-4 items-end">
        <LibraryBig className="h-12 w-12" />
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
        >
          Your Shelves
        </motion.div>
      </h1>
      <div className="flex flex-col gap-8">
        <AnimatePresence>
          {shelves.map((shelf, i) => (
            <motion.div
              key={shelf.name + 'card'}
              initial={{ opacity: 0, x: -10 }}
              exit={{ opacity: 0, x: 10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.1 + 0.1 * i
                }
              }}
              transition={{ duration: 0.1, ease: 'linear', stiffness: 0 }}
              className="bg-neutral-100/30 dark:bg-neutral-900/30 rounded-lg pt-2 flex flex-col border"
            >
              <div className="flex gap-2 px-8 pt-4 font-bold">
                <Library /> {shelf.name}
              </div>
              <div
                className="w-fit max-w-full flex-col flex-wrap overflow-auto flex px-8 gap-8 h-64 py-4 justify-center"
                id="homeshelf"
              >
                <AnimatePresence>
                  {shelf.books.map((book, k) => (
                    <motion.div
                      key={book.location + 'card' + shelf.name}
                      initial={{ opacity: 0, y: -10 }}
                      exit={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: {
                          delay: 0.1 + 0.1 * k
                        }
                      }}
                      transition={{ duration: 0.1, ease: 'linear', stiffness: 0 }}
                      className="flex-shrink"
                    >
                      <TheBook
                        shelf={i}
                        book={book}
                        dummyClassName="!p-4"
                        className="max-h-48 max-w-32 w-fit prose-h1:text-sm prose-p:text-xs prose-sm overflow-hidden "
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
