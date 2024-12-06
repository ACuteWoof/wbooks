import { createContext } from 'react'
import { Shelf } from './types'

export const PageContext = createContext<[number, (e: number) => void]>([0, () => {}])
export const ShelfContext = createContext<[number, (e: number) => void]>([0, () => {}])
export const ShelvesContext = createContext<[Shelf[], (e: Shelf[]) => void]>([[], () => {}])
