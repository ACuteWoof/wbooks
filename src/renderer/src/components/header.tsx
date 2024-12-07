import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@renderer/components/ui/breadcrumb'
import { Separator } from '@renderer/components/ui/separator'
import DarkModeTrigger from '@renderer/components/darkmode'
import { SidebarTrigger } from './ui/sidebar'
import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function Header({
  path,
  rightElements
}: {
  path: string[]
  rightElements?: ReactNode[]
}) {
  return (
    <header className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4 mb-2">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <AnimatePresence>
            {path &&
              path.map((p, i) => {
                if (i === path.length - 1) {
                  return (
                    <motion.div
                      key={p + 'norm'}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        x: 0,
                        transition: { delay: 0.05 }
                      }}
                      exit={{
                        opacity: 0,
                        y: 10
                      }}
                      transition={{ duration: 0.05 }}
                    >
                      <BreadcrumbItem className="text-neutral-950 dark:text-neutral-50">
                        {p}
                      </BreadcrumbItem>
                    </motion.div>
                  )
                }
                return [
                  <motion.div
                    key={p + 'norm'}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.05 }
                    }}
                    exit={{
                      opacity: 0,
                      x: -10,
                      transition: { delay: 0.05 * (path.length - 1 - i) }
                    }}
                    transition={{ duration: 0.05 }}
                  >
                    <BreadcrumbItem>{p}</BreadcrumbItem>
                  </motion.div>,
                  <motion.div
                    key={p + 'sep'}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.05 }
                    }}
                    exit={{
                      opacity: 0,
                      x: -10,
                      transition: { delay: 0.05 * (path.length - 1 - i) }
                    }}
                    transition={{ duration: 0.05 }}
                  >
                    <BreadcrumbSeparator />
                  </motion.div>
                ]
              })}
          </AnimatePresence>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-grow" />
      <div className="flex gap-4 items-center">
        {rightElements}
        <DarkModeTrigger />
      </div>
    </header>
  )
}
