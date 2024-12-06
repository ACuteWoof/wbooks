import { createContext } from 'react'
import { Book, Shelf } from './types'

export const PageContext = createContext<[number, (e: number) => void]>([0, () => {}])
export const IsDarkContext = createContext<[boolean, (e: boolean) => void]>([true, () => {}])
export const ShelfContext = createContext<[number, (e: number) => void]>([0, () => {}])
export const ShelvesContext = createContext<[Shelf[], (e: Shelf[]) => void]>([[], () => {}])
export const BookContext = createContext<[Book | undefined, (e: Book) => void]>([, () => {}])
