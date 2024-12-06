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
          {path &&
            path.map((p, i) => {
              if (i === path.length - 1) {
                return (
                  <BreadcrumbItem className="text-neutral-950 dark:text-neutral-50">
                    {p}
                  </BreadcrumbItem>
                )
              }
              return (
                <>
                  <BreadcrumbItem>{p}</BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )
            })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex-grow' />
      <div className="flex gap-4 items-center">
        {rightElements}
        <DarkModeTrigger />
      </div>
    </header>
  )
}
