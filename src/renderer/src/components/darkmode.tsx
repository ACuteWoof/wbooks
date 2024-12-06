import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export default function DarkModeTrigger() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-md"
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
