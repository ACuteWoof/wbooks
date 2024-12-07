import { HeaderContext, ShelvesContext } from '@renderer/contexts'
import { Library, LibraryBig } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { TheBook } from '../shelf/book'
import { AnimatePresence, motion } from 'motion/react'

export default function Home() {
  const [shelves] = useContext(ShelvesContext)
  const [, setHeaderProps] = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({
      visible: true
    })
  }, [])

  return (
    <motion.div
      key={'home'}
      initial={{ x: -10 }}
      exit={{ x: 10 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.1, ease: 'linear', stiffness: 0 }}
    >
      <div className="prose prose-neutral dark:prose-invert p-12 !max-w-none">
        <h1 className="text-5xl flex gap-4 items-end">
          <LibraryBig className="h-12 w-12" /> Your Shelves
        </h1>
        <div className="flex flex-col gap-8">
          <AnimatePresence>
            {shelves.map((shelf) => (
              <motion.div
                key={shelf.name + 'card'}
                initial={{ x: -10 }}
                exit={{ x: 10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.1, ease: 'linear', stiffness: 0 }}
                className="bg-neutral-100 dark:bg-neutral-900 rounded-lg flex flex-col border"
              >
                <div className="flex gap-2 px-8 pt-4 font-bold">
                  <Library /> {shelf.name}
                </div>
                <div
                  className="w-full flex-col flex-wrap overflow-auto flex px-8 gap-8 h-64 py-4"
                  id="homeshelf"
                >
                  {shelf.books.map((book) => (
                    <TheBook
                      book={book}
                      className="max-h-52 max-w-40 prose-h1:text-sm prose-p:text-xs prose-sm overflow-hidden "
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
