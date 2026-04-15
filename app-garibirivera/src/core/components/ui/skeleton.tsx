import { cn } from "@/core/utils/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[12px]",
        "bg-[var(--border-subtle)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
