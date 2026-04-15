import * as React from "react"

import { cn } from "@/core/utils/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Dimensiones
          "flex h-11 w-full px-4 py-2.5",
          // Forma
          "rounded-[12px]",
          // Superficie – usa token para máxima compatibilidad claro/oscuro
          "bg-[var(--surface-raised)] border-[1.5px] border-[var(--border-default)]",
          // Texto – siempre contraste correcto
          "text-[var(--text-primary)] text-sm font-medium",
          "placeholder:text-[var(--text-tertiary)] placeholder:font-normal",
          // Focus con halo amarillo corporativo
          "focus-visible:outline-none focus-visible:border-[#f3d03e]",
          "focus-visible:ring-[3px] focus-visible:ring-[rgba(243,208,62,0.22)]",
          // Transition
          "transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]",
          // Deshabilitado
          "disabled:cursor-not-allowed disabled:opacity-40",
          // Archivo
          "file:border-0 file:bg-transparent file:text-sm file:font-semibold",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
