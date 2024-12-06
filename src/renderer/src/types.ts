export interface Book {
  name: string
  author: string
  year?: number
  location: string
}

export interface Shelf {
  name: string
  books: Book[]
}
