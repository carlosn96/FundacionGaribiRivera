"use client";

import * as React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/core/components/ui/select";
import { cn } from "@/core/utils/utils";

/**
 * CorporateSelect Option interface
 */
export interface CorporateSelectOption {
  value: string | number;
  label: string;
}

/**
 * CorporateSelect Props interface
 */
interface CorporateSelectProps {
  options: CorporateSelectOption[];
  value?: string | number;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  /**
   * Optional variant to adjust sizes. 
   * 'compact' is toolbar size (h-9), 'md' is standard (h-[46px]), 'lg' is larger (h-14).
   */
  variant?: 'compact' | 'md' | 'lg';
}

/**
 * A reusable Select component that follows the corporate styling of the project
 * (zinc background, fundacion-verde focus, rounded corners).
 * Follows the "instructor selector" look from the TallerFormModal.
 */
export function CorporateSelect({
  options,
  value,
  onValueChange,
  placeholder = "Seleccionar...",
  label,
  icon,
  loading = false,
  disabled = false,
  className,
  triggerClassName,
  variant = 'md',
}: CorporateSelectProps) {
  
  const heightClass  = variant === 'lg' ? "h-14" : variant === 'compact' ? "h-9" : "h-[46px]";
  const roundedClass = variant === 'lg' ? "rounded-2xl" : variant === 'compact' ? "rounded-lg" : "rounded-xl";
  const itemRoundedClass = variant === 'lg' ? "rounded-xl" : "rounded-lg";
  const iconPadding  = icon ? (variant === 'compact' ? "pl-8" : "pl-14") : undefined;
  const iconLeft     = variant === 'compact' ? "left-2.5" : "left-5";
  const fontSize     = variant === 'compact' ? "text-xs" : "text-sm";

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-[0.2em] ml-2 opacity-60">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && React.isValidElement(icon) && (
          <div className={cn("absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none vision-text-disabled", iconLeft)}>
             {(() => {
               const iconElement = icon as React.ReactElement<{ className?: string }>;
               return React.cloneElement(iconElement, {
                 className: cn(variant === 'compact' ? "w-3.5 h-3.5" : "w-5 h-5", iconElement.props.className)
               });
             })()}
          </div>
        )}
        <Select 
          value={value?.toString()} 
          onValueChange={onValueChange} 
          disabled={disabled || loading}
        >
          <SelectTrigger 
            className={cn(
               "w-full vision-input-base font-bold transition-all",
               fontSize,
               heightClass,
               roundedClass,
               iconPadding,
               triggerClassName
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1 group">
                <div className="truncate flex-1 text-left">
                  <SelectValue placeholder={loading ? "Cargando..." : placeholder} />
                </div>
            </div>
          </SelectTrigger>
          <SelectContent className={cn("border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-72 bg-white dark:bg-zinc-950", roundedClass)}>
             {options.map((opt) => (
                <SelectItem 
                  key={opt.value} 
                  value={opt.value.toString()}
                  className={cn(
                    "font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde mx-1 cursor-pointer transition-colors",
                    itemRoundedClass
                  )}
                >
                  {opt.label}
                </SelectItem>
             ))}
             {options.length === 0 && !loading && (
               <div className="py-8 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Sin opciones disponibles
               </div>
             )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
