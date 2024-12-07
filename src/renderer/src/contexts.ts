import { createContext } from 'react'
import { Book, HeaderContextProps, Shelf } from './types'

export const PageContext = createContext<[number, (e: number) => void]>([0, () => {}])
export const ShelfContext = createContext<[number, (e: number) => void]>([0, () => {}])
export const ShelvesContext = createContext<[Shelf[], (e: Shelf[]) => void]>([[], () => {}])
export const BookContext = createContext<[Book | undefined, (e: Book) => void]>([, () => {}])
export const HeaderContext = createContext<[HeaderContextProps, (e: HeaderContextProps) => void]>([
  { visible: true, path: ['The Library'] },
  () => {}
])
