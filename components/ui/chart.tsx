import type { FC, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ChartContainerProps {
  children: ReactNode
  className?: string
}

export const ChartContainer: FC<ChartContainerProps> = ({ children, className }) => {
  return <div className={cn("rounded-md border border-border", className)}>{children}</div>
}

interface ChartTooltipContentProps {
  children: ReactNode
  className?: string
}

export const ChartTooltipContent: FC<ChartTooltipContentProps> = ({ children, className }) => {
  return (
    <div className={cn("rounded-md border border-border bg-popover text-popover-foreground p-2 text-sm", className)}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  content: ({ active, payload }: { active: boolean; payload: any[] }) => ReactNode | null
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ content }) => {
  return null
}

export const Chart = () => {
  return null
}
