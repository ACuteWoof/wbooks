import { HoverCard, HoverCardContent, HoverCardTrigger } from '@renderer/components/ui/hover-card'
import { BookContext, PageContext, ShelfContext, ShelvesContext } from '@renderer/contexts'
import { Book } from '@renderer/types'
import { useContext, useEffect, useState } from 'react'
import ePub from 'epubjs'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@renderer/components/ui/context-menu'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@renderer/components/ui/alert-dialog'
import { Button } from '@renderer/components/ui/button'

export default function BookOnShelf({ book, className }: { book: Book; className?: string }) {
  const [shelfIndex] = useContext(ShelfContext)
  const [shelves, setShelves] = useContext(ShelvesContext)

  return (
      <AlertDialog>
        <HoverCard>
          <div className="">
            <HoverCardTrigger className="!no-underline">
              <ContextMenu>
                <ContextMenuTrigger>
                  <TheBook className={className} book={book} />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <AlertDialogTrigger asChild>
                    <ContextMenuItem>Remove</ContextMenuItem>
                  </AlertDialogTrigger>
                </ContextMenuContent>
              </ContextMenu>
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2">
              <span className="font-bold">{book.name}</span>
              <span className="text-sm">
                {book.author}
                {book.year &&
                  ', ' +
                    (book.year < 1000
                      ? book.year >= 0
                        ? `${book.year} AD`
                        : `${Math.abs(book.year)} BC`
                      : book.year)}
              </span>
            </HoverCardContent>
          </div>
        </HoverCard>
        <AlertDialogContent className="dark:text-neutral-50">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove <em>{book.name ?? ''}</em>?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            This will not delete the file from your computer, only hide it from the app.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button asChild variant="destructive">
              <AlertDialogCancel
                onClick={() => {
                  const newShelves = [...shelves]
                  newShelves[shelfIndex].books = shelves[shelfIndex].books.filter(
                    (sb) => !Object.is(sb, book)
                  )
                  setShelves(newShelves)
                }}
              >
                Remove
              </AlertDialogCancel>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export function TheBook({ book, className }: { book: Book; className?: string }) {
  const [, setPage] = useContext(PageContext)
  const [, setBook] = useContext(BookContext)
  const [coverUrl, setCoverUrl] = useState<string>()
  const [useDummy, setUseDummy] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const ebook = ePub('file://' + book.location)
      console.log(ebook)
      const ebookCover = await ebook.coverUrl()
      console.log(ebookCover)
      if (!ebookCover) {
        setUseDummy(true)
        return
      }
      setCoverUrl(ebookCover)
    })()
  }, [book])

  return useDummy ? (
    <div
      className={
        'prose-h1:text-2xl prose-p:text-sm flex flex-col justify-between cursor-pointer bg-neutral-200 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-all duration-200 h-96 w-64 p-8 border-2 ' +
        className
      }
    >
      <h1 className="break-words">{book.name}</h1>
      <p>{book.author}</p>
    </div>
  ) : (
    <img
      src={coverUrl}
      className={'border-2 cursor-pointer m-0 aspect-auto w-fit ' + className}
      onClick={() => {
        setPage(0)
        setBook(book)
      }}
    />
  )
}
