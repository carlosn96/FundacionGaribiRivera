"use client";

import React from "react";
import { Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";

interface EtapasFilterProps {
  availableYears: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
}

export function EtapasFilter({ availableYears, selectedYear, onYearChange }: EtapasFilterProps) {
  return (
    <div className="group relative pr-[1px] pb-[1px]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-800/50 rounded-3xl -z-10 group-hover:from-fundacion-azul/20 group-hover:to-transparent transition-colors duration-500" />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 bg-white dark:bg-zinc-950 p-5 md:p-6 rounded-[23px] shadow-sm">
        
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-fundacion-azul/5 dark:bg-fundacion-azul/10 rounded-2xl text-fundacion-azul shadow-inner">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest leading-none mb-1">
              Visualización
            </p>
            <p className="text-sm font-bold vision-text-primary tracking-tight">
              Filtrar por Año
            </p>
          </div>
        </div>

        <div className="w-full md:w-72 flex items-center gap-3">
          <div className="hidden md:flex bg-zinc-50 dark:bg-zinc-900 px-3 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <Calendar className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="flex-1">
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 hover:bg-zinc-50 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 focus:ring-fundacion-azul/20 focus:border-fundacion-azul/50 font-bold vision-text-secondary transition-all">
                <SelectValue placeholder="Selecciona Año" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                <SelectItem value="all" className="font-bold py-3 pr-8 focus:bg-fundacion-azul/5 focus:text-fundacion-azul rounded-lg mx-1 cursor-pointer">
                  Todos los años
                </SelectItem>
                {availableYears.filter(y => y !== "all").map(year => (
                  <SelectItem 
                    key={year} 
                    value={year} 
                    className="font-bold py-3 pr-8 focus:bg-fundacion-azul/5 focus:text-fundacion-azul rounded-lg mx-1 mt-1 cursor-pointer"
                  >
                    Año {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
