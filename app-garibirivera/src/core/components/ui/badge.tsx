import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/utils/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
    "transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]",
    "focus:outline-none focus:ring-2 focus:ring-[rgba(243,208,62,0.55)] focus:ring-offset-2",
    "backdrop-blur-[8px]",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Amarillo corporativo – siempre legible */
        default:
          "vision-badge-brand",

        /* Verde corporativo – texto blanco */
        secondary:
          "bg-[var(--color-fundacion-verde)] border border-[rgba(23,63,54,0.60)] text-white",

        /* Estado de error */
        destructive:
          "vision-badge-danger",

        /* Neutro con buen contraste */
        outline:
          "border border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-secondary)]",

        /* Éxito / activo */
        success:
          "vision-badge-success",

        /* Muted / deshabilitado / informativo */
        muted:
          "vision-badge-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
