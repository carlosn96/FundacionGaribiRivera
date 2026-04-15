import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/utils/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold",
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[rgba(243,208,62,0.55)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Shadcn defaults – usan las variables --primary, etc. */
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-sm hover:shadow-md active:scale-[0.98]",
        destructive:
          "bg-[var(--color-vision-red)] text-white hover:bg-[var(--color-vision-red)]/90 rounded-xl shadow-sm active:scale-[0.98]",
        outline:
          "border-[1.5px] border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-primary)] hover:bg-[var(--interact-hover)] rounded-xl active:scale-[0.98]",
        secondary:
          "bg-[var(--color-fundacion-verde)] text-white hover:bg-[var(--color-fundacion-verde-light)] rounded-xl shadow-sm hover:shadow-md active:scale-[0.98]",
        ghost:
          "text-[var(--text-primary)] hover:bg-[var(--interact-hover)] rounded-xl active:scale-[0.98]",
        link:
          "text-[var(--color-fundacion-verde)] underline-offset-4 hover:underline rounded-none",

        /* ── Variantes Vision corporativas ────────────── */
        vision:
          [
            "bg-transparent border border-transparent rounded-2xl",
            "text-[var(--text-primary)]",
            "hover:bg-[var(--interact-hover)] hover:border-[var(--border-subtle)] hover:scale-[1.02]",
            "active:scale-[0.98] active:bg-[var(--interact-active)]",
          ].join(" "),

        visionGlass:
          [
            "bg-[var(--surface-raised)] border-[1.5px] border-[var(--border-default)] rounded-2xl",
            "text-[var(--text-primary)] font-semibold",
            "hover:border-[var(--border-brand)] hover:scale-[1.02] hover:shadow-md",
            "active:scale-[0.98]",
            "backdrop-blur-[16px]",
          ].join(" "),

        visionPrimary:
          [
            "bg-[#f3d03e] border border-[rgba(243,208,62,0.80)] rounded-2xl",
            "text-[var(--text-on-brand)] font-bold",
            "hover:bg-[#f5d94a] hover:scale-[1.03] hover:shadow-lg hover:shadow-[rgba(243,208,62,0.30)]",
            "active:scale-[0.98]",
          ].join(" "),

        visionSecondary:
          [
            "bg-[var(--color-fundacion-verde)] border border-[rgba(23,63,54,0.70)] rounded-2xl",
            "text-white font-bold",
            "hover:bg-[var(--color-fundacion-verde-light)] hover:scale-[1.03] hover:shadow-lg hover:shadow-[rgba(23,63,54,0.30)]",
            "active:scale-[0.98]",
          ].join(" "),

        visionDestructive:
          [
            "bg-[var(--surface-raised)] border-[1.5px] border-[rgba(217,48,37,0.30)] rounded-2xl",
            "text-[var(--color-vision-red)] font-semibold",
            "hover:bg-[rgba(217,48,37,0.08)] hover:border-[rgba(217,48,37,0.50)] hover:scale-[1.02]",
            "active:scale-[0.98]",
          ].join(" "),
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-10 w-10",
        visionSm: "h-9 px-4 text-sm rounded-xl",
        visionMd: "h-11 px-6 text-sm rounded-2xl",
        visionLg: "h-14 px-10 text-base rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
