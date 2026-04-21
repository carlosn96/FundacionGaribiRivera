"use client";

import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, ChevronUp, ChevronDown, 
  User, LucideIcon 
} from "lucide-react";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/core/components/ui/table";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { cn } from "@/core/utils/utils";
import { useMediaQuery } from "@/core/hooks/useMediaQuery";

/* ─── Tipos ────────────────────────────────────────────── */

export interface CorporateColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  /** Clase para la celda de datos */
  className?: string;
  /** Clase para la celda del encabezado */
  headerClassName?: string;
  /** Ocultar en ciertos breakpoints */
  hiddenOn?: 'sm' | 'md' | 'lg';
}

interface CorporateTableProps<T> {
  data: T[];
  columns: CorporateColumn<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
  maxHeight?: string;
  defaultSortKey?: string;
  defaultSortDirection?: 'asc' | 'desc';
  onRowClick?: (item: T) => void;
  /** Valor para el sticky top (por si hay un header arriba) */
  stickyOffset?: string;
}

/* ─── Sub-componentes ──────────────────────────────────── */

function SortHeader({ 
  label, 
  active, 
  direction, 
  onToggle,
  className
}: { 
  label: string; 
  active: boolean; 
  direction: 'asc' | 'desc'; 
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-1.5 vision-caption-upper transition-colors duration-200 group text-[9px]",
        active ? "vision-text-primary" : "vision-text-disabled hover:vision-text-secondary",
        className
      )}
    >
      {label}
      <div className="flex flex-col -space-y-1 opacity-40 group-hover:opacity-100 transition-opacity">
        {active && direction === 'asc' ? (
          <ChevronUp className="w-2.5 h-2.5 text-vision-brand" />
        ) : active && direction === 'desc' ? (
          <ChevronDown className="w-2.5 h-2.5 text-vision-brand" />
        ) : (
          <ArrowUpDown className="w-2.5 h-2.5" />
        )}
      </div>
    </button>
  );
}

function TableSkeleton({ columns }: { columns: CorporateColumn<any>[] }) {
  return (
    <div className="space-y-0 divide-y border-subtle">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
          <div className="w-9 h-9 rounded-full surface-raised flex-none" />
          <div className="flex-1 space-y-2">
            <div className="h-3 surface-raised rounded w-3/4" />
            <div className="h-2.5 surface-raised rounded w-1/2 opacity-60" />
          </div>
          {columns.slice(2).map((col, idx) => (
            <div 
              key={idx} 
              className={cn(
                "w-24 h-6 surface-raised rounded-full flex-none hidden",
                col.hiddenOn === 'md' ? 'md:hidden' : col.hiddenOn === 'lg' ? 'lg:hidden' : 'md:block'
              )} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Vista Mobile: Cards ──────────────────────────────── */

function MobileCardList<T>({
  data,
  columns,
  sortConfig,
  onSort,
  onRowClick,
}: {
  data: T[];
  columns: CorporateColumn<T>[];
  sortConfig: { key: string | null; direction: 'asc' | 'desc' };
  onSort: (key: string) => void;
  onRowClick?: (item: T) => void;
}) {
  // Primera columna → identidad principal del card
  const [primaryCol, ...restCols] = columns;
  // Separar la columna de acciones (última, no sortable, sin hiddenOn)
  const actionCol = restCols.find(
    (c) => c.key === 'acciones' || (c.className?.includes('text-right') && !c.sortable)
  );
  const bodyCols = restCols.filter((c) => c !== actionCol && c.hiddenOn !== 'sm');

  // Sortables disponibles
  const sortableCols = columns.filter((c) => c.sortable);

  return (
    <div className="flex flex-col gap-px">
      {/* Sort chips */}
      {sortableCols.length > 0 && (
        <div className="flex items-center gap-2 px-1 pb-2 overflow-x-auto">
          <span className="vision-caption-upper vision-text-disabled text-[9px] flex-none">Ordenar:</span>
          {sortableCols.map((col) => {
            const isActive = sortConfig.key === col.key;
            return (
              <button
                key={col.key}
                onClick={() => onSort(col.key)}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest flex-none",
                  "transition-all duration-200",
                  isActive
                    ? "border-border-brand vision-badge-brand"
                    : "border-subtle vision-text-disabled hover:vision-text-secondary"
                )}
              >
                {col.header}
                {isActive ? (
                  sortConfig.direction === 'asc'
                    ? <ChevronUp className="w-2.5 h-2.5" />
                    : <ChevronDown className="w-2.5 h-2.5" />
                ) : (
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-40" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Cards */}
      {data.map((item, index) => (
        <div
          key={index}
          role={onRowClick ? "button" : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          onClick={() => onRowClick?.(item)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick?.(item); }}
          className={cn(
            "group relative rounded-2xl border border-subtle surface-raised",
            "p-4 mb-2 overflow-hidden",
            "transition-all duration-200 ease-[var(--spring-smooth)]",
            "animate-in fade-in slide-in-from-bottom-1",
            onRowClick && "cursor-pointer active:scale-[0.985]"
          )}
          style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}
        >
          {/* Highlight strip on hover/active */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-y-0 left-0 w-[3px] rounded-l-2xl",
              "bg-border-brand opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            )}
          />

          {/* Primary row: identity + actions */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              {primaryCol.render
                ? primaryCol.render(item)
                : <span className="vision-text-primary font-semibold text-sm">{(item as any)[primaryCol.key]}</span>
              }
            </div>
            {actionCol && (
              <div className="flex-none" onClick={(e) => e.stopPropagation()}>
                {actionCol.render ? actionCol.render(item) : null}
              </div>
            )}
          </div>

          {/* Body columns stacked */}
          {bodyCols.length > 0 && (
            <div
              className={cn(
                "pt-3 border-t border-subtle",
                bodyCols.length === 1
                  ? "grid grid-cols-1"
                  : "grid grid-cols-2 gap-x-4 gap-y-2.5"
              )}
            >
              {bodyCols.map((col) => (
                <div key={col.key} className="min-w-0">
                  <p className="vision-caption-upper vision-text-disabled text-[8px] mb-1">
                    {col.header}
                  </p>
                  <div className={cn("truncate", col.className)}>
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Componente Principal ────────────────────────────── */

export function CorporateTable<T>({
  data,
  columns,
  isLoading,
  emptyMessage = "No se encontraron resultados",
  emptyIcon: EmptyIcon = User,
  maxHeight = "600px",
  defaultSortKey,
  defaultSortDirection = 'asc',
  onRowClick,
  stickyOffset = "0"
}: CorporateTableProps<T>) {
  const isMobile = useMediaQuery('(max-width: 639px)');
  
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({ 
    key: defaultSortKey || (columns.find(c => c.sortable)?.key || null), 
    direction: defaultSortDirection 
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a: any, b: any) => {
      // Intentar obtener el valor para ordenar (soporta anidamiento simple como 'prop.subprop' si fuera necesario)
      // Por ahora simple: a[key]
      const valA = a[sortConfig.key!];
      const valB = b[sortConfig.key!];

      if (valA === valB) return 0;
      
      const comparison = valA < valB ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-subtle surface-raised overflow-hidden">
        <TableSkeleton columns={columns} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-subtle surface-raised p-12 text-center space-y-2">
        <EmptyIcon className="w-8 h-8 vision-text-disabled mx-auto" />
        <p className="vision-caption-upper vision-text-disabled text-xs">
          {emptyMessage}
        </p>
      </div>
    );
  }

  /* ── Vista mobile: cards apilados ── */
  if (isMobile) {
    return (
      <MobileCardList
        data={sortedData}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        onRowClick={onRowClick}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-subtle surface-raised overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ScrollArea 
        className="w-full [&_[data-radix-scroll-area-viewport]>div]:!block"
        style={{ height: maxHeight }}
      >
        <Table className="border-separate border-spacing-0">
          <TableHeader className="relative z-30">
            <TableRow className="hover:bg-transparent border-none">
              {columns.map((col) => (
                <TableHead 
                  key={col.key}
                  className={cn(
                    "sticky z-30 bg-surface-base border-b border-subtle py-3",
                    "transition-colors duration-200 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]",
                    col.hiddenOn === 'sm' && "hidden sm:table-cell",
                    col.hiddenOn === 'md' && "hidden md:table-cell",
                    col.hiddenOn === 'lg' && "hidden lg:table-cell",
                    col.headerClassName
                  )}
                  style={{ top: stickyOffset }}
                >
                  {col.sortable ? (
                    <SortHeader 
                      label={col.header} 
                      active={sortConfig.key === col.key} 
                      direction={sortConfig.direction} 
                      onToggle={() => handleSort(col.key)} 
                    />
                  ) : (
                    <span className="vision-caption-upper vision-text-disabled text-[9px]">
                      {col.header}
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "group border-b border-subtle transition-colors duration-200",
                  "hover:surface-raised",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <TableCell 
                    key={col.key}
                    className={cn(
                      "py-3 transition-all duration-300",
                      col.hiddenOn === 'sm' && "hidden sm:table-cell",
                      col.hiddenOn === 'md' && "hidden md:table-cell",
                      col.hiddenOn === 'lg' && "hidden lg:table-cell",
                      col.className
                    )}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
