export interface Note {
  elementId: string
  note: string
  color: string
}

export interface Book {
  name: string
  author: string
  location: string
  cover: string
  year?: number
  leftoffpage?: number
  notes?: Note[]
}

export interface Shelf {
  name: string
  books: Book[]
}
