import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export default function DarkModeTrigger() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => {
        if (theme === 'light') {
          setTheme('dark')
          return
        }
        setTheme('light')
      }}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  )
}
