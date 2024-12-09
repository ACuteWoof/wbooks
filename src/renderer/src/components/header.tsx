import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@renderer/components/ui/breadcrumb'
import { Separator } from '@renderer/components/ui/separator'
import DarkModeTrigger from '@renderer/components/darkmode'
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import { AnimatePresence, motion } from 'motion/react'
import { ReactNode, useContext } from 'react'
import { HeaderContext } from '@renderer/contexts'
import { useIsMobile } from '@renderer/hooks/use-mobile'

export default function Header() {
  const [props] = useContext(HeaderContext)
  const isMobile = useIsMobile()
  const sidebar = useSidebar()

  return (
    <header
      className={
        'bg-white/90 dark:bg-neutral-950/90 backdrop-blur top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4 mb-2 transition-all duration-500 ' +
        (props.visible || sidebar.open ? 'opacity-100 sticky' : 'absolute w-full opacity-0 hover:opacity-100')
      }
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <motion.ol className="flex items-center gap-1.5 break-words text-sm text-neutral-500 sm:gap-2.5 dark:text-neutral-400">
          <AnimatePresence mode="popLayout">
            {isMobile && [
              <motion.li
                key={'ecnorm'}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}
                transition={{ duration: 0.25 }}
                layout
              >
                <BreadcrumbItem>...</BreadcrumbItem>
              </motion.li>,
              <motion.li
                key={'ecsep'}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}
                transition={{ duration: 0.25 }}
                layout
              >
                <BreadcrumbSeparator />
              </motion.li>
            ]}

            {props.path &&
              props.previousPathLength &&
              props.path.map((p, i) => {
                if (i === props.path.length - 1) {
                  return (
                    <motion.li
                      key={i + p + 'norm'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      exit={{
                        opacity: 0,
                        y: 10
                      }}
                      transition={{ duration: 0.25 }}
                      layout
                    >
                      <BreadcrumbItem className="text-neutral-950 dark:text-neutral-50">
                        {p}
                      </BreadcrumbItem>
                    </motion.li>
                  )
                }
                return isMobile
                  ? null
                  : [
                      <motion.li
                        key={i + p + 'norm'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        exit={{
                          opacity: 0,
                          y: -10
                        }}
                        transition={{ duration: 0.25 }}
                        layout
                      >
                        <BreadcrumbItem>{p}</BreadcrumbItem>
                      </motion.li>,
                      <motion.li
                        key={i + p + 'sep'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        exit={{
                          opacity: 0,
                          y: -10
                        }}
                        transition={{ duration: 0.25 }}
                        layout
                      >
                        <BreadcrumbSeparator />
                      </motion.li>
                    ]
              })}
          </AnimatePresence>
        </motion.ol>
      </Breadcrumb>
      <div className="flex-grow" />
      <div className="flex gap-4 items-center">
        <AnimatePresence>
          {props.rightElements &&
            props.rightElements.map((element: ReactNode, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -10
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {element}
                </motion.div>
              )
            })}
        </AnimatePresence>
        <DarkModeTrigger />
      </div>
    </header>
  )
}
