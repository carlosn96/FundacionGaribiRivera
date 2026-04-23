"use client";

import React from 'react';
import { cn } from "@/core/utils/utils";

interface CorporateGridProps {
  children: React.ReactNode;
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
}

/**
 * A standardized responsive grid layout for corporate content (cards/items).
 * Uses CSS Grid with smart defaults and configurable columns per breakpoint.
 */
export function CorporateGrid({ 
  children, 
  columns = { default: 1, sm: 1, md: 2, lg: 3, xl: 3 },
  className 
}: CorporateGridProps) {
  const gridCols = cn(
    "grid gap-6 sm:gap-8",
    columns.default && `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className
  );

  return (
    <div className={gridCols}>
      {children}
    </div>
  );
}
