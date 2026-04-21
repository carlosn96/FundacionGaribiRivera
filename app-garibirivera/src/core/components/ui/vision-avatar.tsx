"use client";

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/core/components/ui/skeleton";
import { cn } from "@/core/utils/utils";

interface VisionAvatarProps {
  src?: string | null;
  alt?: string;
  initials?: string;
  className?: string;
  fallbackClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8 rounded-lg",
  md: "h-10 w-10 rounded-xl",
  lg: "h-12 w-12 rounded-2xl",
  xl: "h-16 w-16 rounded-[2rem]",
};

/**
 * VISION AVATAR v2 (High-Performance Native Implementation)
 * Eliminamos el overhead de Radix UI para usar carga progresiva nativa,
 * decoding="async" y transiciones fluidas.
 */
export function VisionAvatar({ 
  src, 
  alt, 
  initials, 
  className, 
  fallbackClassName,
  size = "lg" 
}: VisionAvatarProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reiniciar estado si cambia el src
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const showFallback = !src || error;

  return (
    <div className={cn(
      "relative shrink-0 overflow-hidden flex items-center justify-center border border-[var(--border-subtle)] shadow-lg transition-all duration-700 bg-[var(--surface-raised)]",
      sizeClasses[size], 
      className
    )}>
      {/* SKELETON: Solo se muestra mientras hay imagen, no hay error y no ha cargado */}
      {!loaded && !error && src && (
        <Skeleton className={cn("absolute inset-0 z-10 animate-pulse bg-brand/5 border-none", sizeClasses[size])} />
      )}
      
      {/* IMAGEN NATIVA: Carga asíncrona de alto rendimiento */}
      {!error && src && (
        <img 
          src={src} 
          alt={alt || "Avatar"}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true); // Quitar skeleton
          }}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-500 z-20 ease-out",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        />
      )}

      {/* FALLBACK: Letras iniciales */}
      {(showFallback || !loaded) && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-fundacion-verde to-fundacion-amarillo/80 text-white font-black uppercase z-0",
          size === "sm" ? "text-[8px]" : size === "xl" ? "text-2xl" : "text-sm",
          fallbackClassName
        )}>
          {initials || "?"}
        </div>
      )}
    </div>
  );
}
