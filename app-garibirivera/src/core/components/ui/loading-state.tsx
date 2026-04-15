import React from "react";
import { VisionGlassWindow, VisionText } from "@/core/components/ui/vision-glass";

interface LoadingStateProps {
  message?: string;
  className?: string;
  variant?: 'fullscreen' | 'inline';
}

export function LoadingState({ 
  message = "Cargando información...", 
  className = "",
  variant = 'inline'
}: LoadingStateProps) {
  if (variant === 'fullscreen') {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--surface-default)]/80 backdrop-blur-sm ${className}`}>
        <div className="w-14 h-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mb-6" />
        <VisionText variant="secondary" className="font-bold tracking-widest text-[10px] uppercase opacity-60 animate-pulse">
            {message}
        </VisionText>
      </div>
    );
  }

  return (
    <VisionGlassWindow className={`p-24 flex flex-col items-center justify-center gap-6 shadow-xl border-brand/5 ${className}`}>
      <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      <VisionText variant="secondary" className="text-sm font-medium tracking-wide opacity-50 uppercase text-[10px] italic">
        {message}
      </VisionText>
    </VisionGlassWindow>
  );
}
