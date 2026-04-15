"use client"

import { useToast } from "@/core/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/core/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-right'
    if (!acc[position]) {
      acc[position] = []
    }
    acc[position].push(toast)
    return acc
  }, {} as Record<string, typeof toasts>)

  return (
    <ToastProvider duration={5000}>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <ToastViewport key={position} position={position}>
          {positionToasts.map(function ({ id, title, description, action, position: _, ...props }) {
            return (
              <Toast key={id} {...props}>
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
                {action}
                <ToastClose />
              </Toast>
            )
          })}
        </ToastViewport>
      ))}
    </ToastProvider>
  )
}
