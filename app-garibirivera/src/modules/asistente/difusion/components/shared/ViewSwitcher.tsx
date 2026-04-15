"use client";

import React from 'react';
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/core/components/ui/button";

export type ViewMode = "grid" | "list";

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  totalCount: number;
  label: string;
}

export function ViewSwitcher({ currentView, onViewChange, totalCount, label }: ViewSwitcherProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50">
        <Button 
          variant={currentView === "grid" ? "visionPrimary" : "ghost"} 
          size="visionSm"
          onClick={() => onViewChange("grid")}
          className={`h-9 px-4 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-2 ${currentView === 'grid' ? '' : 'text-zinc-500 hover:text-zinc-700'}`}
        >
          <LayoutGrid className="w-4 h-4" />
          Cuadrícula
        </Button>
        <Button 
          variant={currentView === "list" ? "visionPrimary" : "ghost"} 
          size="visionSm"
          onClick={() => onViewChange("list")}
          className={`h-9 px-4 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-2 ${currentView === 'list' ? '' : 'text-zinc-500 hover:text-zinc-700'}`}
        >
          <List className="w-4 h-4" />
          Lista
        </Button>
      </div>

      <div className="text-[10px] font-black vision-text-tertiary uppercase tracking-[0.2em] px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
        {label}: <span className="text-fundacion-verde-light dark:text-fundacion-amarillo font-black ml-1">{totalCount}</span>
      </div>
    </div>
  );
}
