"use client"

import { useThemeContext } from "@/core/context/ThemeContext"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * Branded Toaster para Fundación Garibi Rivera
 * Implementa estética Vision Glass y colores corporativos
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useThemeContext()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:backdrop-blur-vision group-[.toaster]:backdrop-saturate-vision group-[.toaster]:bg-surface-raised/80 group-[.toaster]:vision-text-primary group-[.toaster]:border-border-default group-[.toaster]:shadow-2xl group-[.toaster]:rounded-vision-md group-[.toaster]:px-6 group-[.toaster]:py-4 group-[.toaster]:font-sans",
          description: "group-[.toast]:vision-text-secondary group-[.toast]:text-xs group-[.toast]:mt-1.5",
          actionButton: "group-[.toast]:bg-fundacion-amarillo group-[.toast]:text-fundacion-verde group-[.toast]:font-bold group-[.toast]:rounded-xl group-[.toast]:transition-all group-[.toast]:hover:scale-105",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:vision-text-secondary",
          success: "group-[.toast]:border-vision-green/30 group-[.toast]:!bg-vision-green/5",
          error: "group-[.toast]:border-vision-red/30 group-[.toast]:!bg-vision-red/5",
          info: "group-[.toast]:border-vision-blue/30 group-[.toast]:!bg-vision-blue/5",
          warning: "group-[.toast]:border-vision-orange/30 group-[.toast]:!bg-vision-orange/5",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
