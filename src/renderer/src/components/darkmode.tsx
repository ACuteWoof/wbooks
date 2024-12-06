import { IsDarkContext } from '@renderer/contexts'
import { useContext } from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeTrigger() {
  const [isDark, setIsDark] = useContext(IsDarkContext)

  return (
    <Button
      variant="ghost"
      size="icon"
      className='h-8 w-8'
      onClick={() => {
        setIsDark(!isDark)
      }}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  )
}
