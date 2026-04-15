"use client";

import React from 'react';

import { User } from "lucide-react";
import { useTalleres } from "../../hooks/useTalleres";
import { cn } from "@/core/utils/utils";

interface InstructorAvatarProps {
  idInstructor?: number;
  nombre?: string;
  apellidoPaterno?: string;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
  className?: string;
}

export function InstructorAvatar({ 
  idInstructor, 
  nombre, 
  apellidoPaterno, 
  size = "md", 
  shape = "circle",
  className 
}: InstructorAvatarProps) {
  const { getInstructorPhotoUrl } = useTalleres();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-xl"
  };

  const initials = `${nombre?.charAt(0) || ""}${apellidoPaterno?.charAt(0) || ""}`;
  const hasName = nombre || apellidoPaterno;

  return (
    <div className={cn(
      "relative shrink-0 overflow-hidden",
      shape === "circle" ? "rounded-full" : "rounded-xl",
      sizeClasses[size],
      className
    )}>
      {/* Fallback Layer */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center font-black uppercase transition-colors tracking-tighter",
        shape === "circle" 
          ? "bg-fundacion-verde/10 text-fundacion-verde border border-fundacion-verde/20" 
          : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
      )}>
        {hasName ? initials : <User className={cn(size === "sm" ? "w-4 h-4" : "w-6 h-6")} />}
      </div>

      {/* Async Identity Layer */}
      {idInstructor && !hasError && (
        <>
          {/* Shimmer Skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 z-20 animate-pulse bg-zinc-200 dark:bg-zinc-800">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
          )}
          
          <img 
            src={getInstructorPhotoUrl(idInstructor)}
            alt={nombre || "Instructor"}
            className={cn(
              "absolute inset-0 w-full h-full object-cover z-10 transition-all duration-500",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
}
