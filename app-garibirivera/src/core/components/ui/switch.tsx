"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/core/utils/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-fundacion-amarillo/20 backdrop-blur-vision-subtle transition-all duration-medium ease-spring-smooth hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fundacion-amarillo/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-fundacion-amarillo data-[state=checked]:border-fundacion-amarillo data-[state=unchecked]:bg-fundacion-amarillo/10",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-fundacion-blanco shadow-[0_2px_8px_rgba(23,63,54,0.15)] ring-0 transition-transform duration-medium ease-spring-bouncy data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
