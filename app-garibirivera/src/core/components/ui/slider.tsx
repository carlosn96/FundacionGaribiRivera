"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/core/utils/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full backdrop-blur-vision-subtle bg-fundacion-amarillo/10 border border-fundacion-amarillo/20">
      <SliderPrimitive.Range className="absolute h-full bg-fundacion-amarillo shadow-[0_0_10px_rgba(243,208,62,0.3)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-fundacion-amarillo bg-fundacion-blanco shadow-[0_2px_10px_rgba(23,63,54,0.2)] ring-offset-background transition-all duration-medium ease-spring-smooth hover:scale-110 hover:shadow-[0_4px_15px_rgba(243,208,62,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fundacion-amarillo/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
