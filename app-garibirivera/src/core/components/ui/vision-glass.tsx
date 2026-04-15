/**
 * VisionGlass – Material del sistema de diseño de Fundación Garibi Rivera
 *
 * ARQUITECTURA:
 * Todos los colores, fondos y bordes se resuelven vía CSS custom properties
 * definidas en globals.css. Nunca se hardcodean colores en los componentes.
 * Esto garantiza coherencia global y soporte automático de modo oscuro.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { cn } from "@/core/utils/utils";

/* ========================================
   VENTANA DE VIDRIO (Glass Window)
   ======================================== */

export interface VisionGlassWindowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * default   → vision-glass-window   (panels/cards normales)
   * lighter   → vision-glass-ornament (cards más elevados / modales)
   * sidebar   → vision-glass-sidebar  (barras laterales)
   */
  variant?: "default" | "lighter" | "sidebar";
  withNoise?: boolean;
}

const VisionGlassWindow = React.forwardRef<
  HTMLDivElement,
  VisionGlassWindowProps
>(({ className, variant = "default", withNoise = false, ...props }, ref) => {
  const variantClasses: Record<string, string> = {
    default:  "vision-glass-window",
    lighter:  "vision-glass-ornament",
    sidebar:  "vision-glass-sidebar",
  };

  return (
    <div
      ref={ref}
      className={cn(
        variantClasses[variant],
        withNoise && "vision-noise",
        className
      )}
      {...props}
    />
  );
});
VisionGlassWindow.displayName = "VisionGlassWindow";

/* ========================================
   ORNAMENTO FLOTANTE (Floating Ornament)
   ======================================== */

export interface VisionOrnamentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "bottom" | "top" | "left" | "right";
  offset?: number;
}

const VisionOrnament = React.forwardRef<HTMLDivElement, VisionOrnamentProps>(
  ({ className, position = "bottom", offset = 30, children, ...props }, ref) => {
    const positionClasses: Record<string, string> = {
      bottom: `bottom-[-${offset}px]`,
      top:    `top-[-${offset}px]`,
      left:   `left-[-${offset}px]`,
      right:  `right-[-${offset}px]`,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "vision-glass-ornament absolute z-10",
          positionClasses[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
VisionOrnament.displayName = "VisionOrnament";

/* ========================================
   ELEMENTO INTERACTIVO
   ======================================== */

export interface VisionInteractiveProps
  extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const VisionInteractive = React.forwardRef<
  HTMLElement,
  VisionInteractiveProps
>(({ className, asChild = false, children, ...props }, ref) => {
  if (asChild) {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("vision-interactive", className)}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cn("vision-interactive", className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
VisionInteractive.displayName = "VisionInteractive";

/* ========================================
   TEXTO CON VIBRANCY (respeta tokens)
   ======================================== */

export interface VisionTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "primary" | "secondary" | "tertiary" | "disabled" | "on-brand" | "on-dark";
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const VisionText = React.forwardRef<HTMLElement, VisionTextProps>(
  ({ className, variant = "primary", as: Component = "span", ...props }, ref) => {
    const variantClasses: Record<string, string> = {
      "primary":   "vision-text-primary",
      "secondary": "vision-text-secondary",
      "tertiary":  "vision-text-tertiary",
      "disabled":  "vision-text-disabled",
      "on-brand":  "vision-text-on-brand",
      "on-dark":   "vision-text-on-dark",
    };

    return (
      <Component
        ref={ref as any}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);
VisionText.displayName = "VisionText";

/* ========================================
   TIPOGRAFÍA JERÁRQUICA
   ======================================== */

export interface VisionTypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | "title-large"
    | "title-1"
    | "headline"
    | "body"
    | "callout"
    | "caption"
    | "caption-upper";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const VisionTypography = React.forwardRef<HTMLElement, VisionTypographyProps>(
  ({ className, variant = "body", as: Component = "p", ...props }, ref) => {
    const variantClasses: Record<string, string> = {
      "title-large":  "vision-title-large",
      "title-1":      "vision-title-1",
      "headline":     "vision-headline",
      "body":         "vision-body",
      "callout":      "vision-callout",
      "caption":      "vision-caption",
      "caption-upper": "vision-caption-upper",
    };

    return (
      <Component
        ref={ref as any}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);
VisionTypography.displayName = "VisionTypography";

/* ========================================
   CONTENEDOR CON ANIMACIÓN SPRING
   ======================================== */

export interface VisionSpringContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

const VisionSpringContainer = React.forwardRef<
  HTMLDivElement,
  VisionSpringContainerProps
>(({ className, delay = 0, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("vision-spring-bouncy", className)}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...props}
    />
  );
});
VisionSpringContainer.displayName = "VisionSpringContainer";

/* ========================================
   SUPERFICIE SEMÁNTICA (convenience wrapper)
   ======================================== */

export interface VisionSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  level?: "base" | "raised" | "overlay" | "float";
  withBorder?: boolean;
  borderStrength?: "subtle" | "default" | "strong" | "brand";
}

const VisionSurface = React.forwardRef<HTMLDivElement, VisionSurfaceProps>(
  ({ className, level = "raised", withBorder = false, borderStrength = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `surface-${level}`,
          withBorder && `border border-${borderStrength}`,
          className
        )}
        {...props}
      />
    );
  }
);
VisionSurface.displayName = "VisionSurface";

/* ========================================
   BADGE SEMÁNTICO
   ======================================== */

export interface VisionBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  sentiment?: "brand" | "success" | "danger" | "muted";
}

const VisionBadge = React.forwardRef<HTMLSpanElement, VisionBadgeProps>(
  ({ className, sentiment = "muted", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-none",
          `vision-badge-${sentiment}`,
          className
        )}
        {...props}
      />
    );
  }
);
VisionBadge.displayName = "VisionBadge";

export {
  VisionGlassWindow,
  VisionOrnament,
  VisionInteractive,
  VisionText,
  VisionTypography,
  VisionSpringContainer,
  VisionSurface,
  VisionBadge,
};
