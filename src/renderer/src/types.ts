import { ReactNode } from 'react'

export interface Note {
  elementId: string
  note: string
  color: string
}

export interface Book {
  name: string
  author: string
  location: string
  desc?: string
  year?: number
  leftoffpage?: number
  notes?: Note[]
}

export interface Shelf {
  name: string
  books: Book[]
}

export interface HeaderContextProps {
  visible: boolean
  path: string[]
  rightElements?: ReactNode[]
  previousPathLength?: number
}
