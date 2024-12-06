import { HoverCard, HoverCardContent, HoverCardTrigger } from '@renderer/components/ui/hover-card'
import { BookContext, PageContext } from '@renderer/contexts'
import { Book } from '@renderer/types'
import { useContext } from 'react'

export default function BookOnShelf({ book, className }: { book: Book; className?: string }) {
  const [, setPage] = useContext(PageContext)
  const [, setBook] = useContext(BookContext)

  return (
    <HoverCard>
      <div className="">
        <HoverCardTrigger>
          <img
            src="https://assets.lulu.com/cover_thumbs/5/7/57gkz9r-front-shortedge-384.jpg"
            className={'border-2 cursor-pointer max-h-96 max-w-96 m-0 ' + className}
            onClick={() => {
              setPage(0)
              setBook(book)
            }}
          />
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
  )
}
