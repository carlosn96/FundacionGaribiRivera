"use client";

import React from 'react';
import { LucideIcon, MoreHorizontal } from "lucide-react";
import { VisionGlassWindow } from "@/core/components/ui/vision-glass";
import { cn } from "@/core/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";

/* ─── Types ─────────────────────────────────────────────── */

export interface GridItemMetadata {
  icon?: LucideIcon;
  label: string;
  value: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted';
}

interface CorporateGridItemProps {
  /** Hero visual: Avatar, branded icon, or image */
  visual?: React.ReactNode;
  /** Primary title – the most important text. Rendered large. */
  title: string;
  /** Muted secondary line below title */
  subtitle?: string;
  /** Badge or chip to show above the title (status category) */
  caption?: React.ReactNode;
  /** Inline status indicator shown in the top-right chip area */
  status?: React.ReactNode;
  /** Key-value pairs rendered in the footer data grid */
  metadata?: GridItemMetadata[];
  /** DropdownMenu items for contextual actions */
  actions?: React.ReactNode;
  /** Arbitrary footer slot */
  footer?: React.ReactNode;
  /** Elevates card with brand accent treatment */
  featured?: boolean;
  /** compact → tighter padding, smaller type */
  variant?: 'compact' | 'standard';
  onClick?: () => void;
  className?: string;
}

/* ─── Component ─────────────────────────────────────────── */

/**
 * CorporateGridItem
 * -----------------
 * Premium reusable card for grid-based data (Instructors, Workshops, Stages).
 *
 * Design principles:
 * 1. Typography hierarchy is the primary tool: title dominates, metadata whispers.
 * 2. No hardcoded colours – every colour token comes from globals.css CSS vars.
 * 3. Breathing room: generous internal padding so nothing feels cramped.
 * 4. The visual (avatar/icon) lands top-left; the action menu is top-right.
 *    Caption + title below them so the eye reads: who → what → details.
 * 5. Metadata sits in a contained 2-col grid at the bottom, never competing.
 */
export function CorporateGridItem({
  visual,
  title,
  subtitle,
  caption,
  status,
  metadata = [],
  actions,
  footer,
  featured = false,
  variant = 'standard',
  onClick,
  className,
}: CorporateGridItemProps) {
  const compact = variant === 'compact';

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      onClick={onClick}
      className={cn(
        "group relative isolate",
        "rounded-[var(--vision-radius-large)]",
        "transition-all duration-500 ease-[var(--spring-smooth)]",
        onClick && "cursor-pointer hover:-translate-y-1 active:scale-[0.98]",
        className
      )}
    >
      {/* ── Ambient glow under card (elevation feel) ── */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "rounded-[var(--vision-radius-large)]",
          "transition-opacity duration-500",
          "opacity-0 group-hover:opacity-100",
          "blur-xl",
          featured
            ? "bg-fundacion-verde/20"
            : "bg-fundacion-amarillo/8 dark:bg-fundacion-amarillo/5"
        )}
      />

      <VisionGlassWindow
        variant={featured ? "lighter" : "default"}
        className={cn(
          "h-full flex flex-col overflow-hidden",
          "rounded-[var(--vision-radius-large)]",
          // Border transitions on hover
          "transition-all duration-500",
          featured
            ? "shadow-[0_0_0_1.5px_var(--border-brand),0_8px_32px_rgba(23,63,54,0.12)]"
            : "group-hover:shadow-[0_4px_24px_rgba(23,63,54,0.10)]",
          compact ? "p-5 gap-4" : "p-6 gap-5 sm:p-8 sm:gap-6"
        )}
      >
        {/* ── Featured indicator stripe ── */}
        {featured && (
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] rounded-t-[var(--vision-radius-large)] bg-gradient-to-r from-fundacion-verde via-fundacion-amarillo to-transparent"
          />
        )}

        {/* ══════════════════════════════════════════
            ZONE 1: VISUAL + ACTION MENU (top bar)
            ══════════════════════════════════════════ */}
        <div className="flex items-start justify-between gap-3">
          {/* LEFT: Hero visual */}
          {visual && (
            <div className={cn(
              "shrink-0 transition-transform duration-500 group-hover:scale-105",
              featured && "drop-shadow-[0_4px_12px_rgba(23,63,54,0.20)]"
            )}>
              {visual}
            </div>
          )}

          {/* RIGHT: Status chip + action button */}
          <div
            className="flex items-center gap-2 ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {status && (
              <div className="hidden sm:block">
                {status}
              </div>
            )}

            {actions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Opciones"
                    className={cn(
                      "shrink-0 flex items-center justify-center",
                      "w-9 h-9 rounded-[var(--vision-radius-small)]",
                      "border border-[var(--border-subtle)]",
                      "bg-[var(--surface-raised)] hover:bg-[var(--interact-hover)]",
                      "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                      "transition-all duration-200 active:scale-90"
                    )}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={cn(
                    "w-60 p-2",
                    "rounded-[var(--vision-radius-medium)]",
                    "border border-[var(--border-default)]",
                    "bg-[var(--surface-float)]",
                    "shadow-[0_8px_32px_rgba(23,63,54,0.14)]",
                    "backdrop-blur-xl"
                  )}
                >
                  {actions}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ZONE 2: IDENTITY (caption → title → subtitle)
            Purpose: clear textual hierarchy
            ══════════════════════════════════════════ */}
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Caption / badge slot – lives above the title */}
          {caption && (
            <div className="flex items-center gap-2">
              {caption}
            </div>
          )}

          {/* PRIMARY TITLE – the dominant visual element */}
          <h3
            title={title}
            className={cn(
              "font-extrabold leading-tight tracking-tight",
              "truncate",
              compact
                ? "text-base sm:text-lg"
                : "text-xl sm:text-2xl",
              featured
                ? "vision-text-primary"
                : "vision-text-primary group-hover:text-[var(--text-secondary)] transition-colors duration-300"
            )}
          >
            {title}
          </h3>

          {/* Subtitle – secondary identifier, muted */}
          {subtitle && (
            <p className={cn(
              "vision-caption-upper vision-text-tertiary",
              "truncate",
              "flex items-center gap-2"
            )}>
              {/* Decorative rule that grows on hover */}
              <span
                aria-hidden
                className={cn(
                  "inline-block h-px w-4 shrink-0",
                  "bg-[var(--border-default)]",
                  "transition-all duration-500 group-hover:w-6"
                )}
              />
              {subtitle}
            </p>
          )}
        </div>

        {/* ══════════════════════════════════════════
            ZONE 3: METADATA GRID (key-value pairs)
            Visually separated, never competing with title
            ══════════════════════════════════════════ */}
        {metadata.length > 0 && (
          <div className={cn(
            "mt-auto",
            "pt-4 border-t border-[var(--border-subtle)]",
            "grid gap-2",
            metadata.length === 1
              ? "grid-cols-1"
              : "grid-cols-2"
          )}>
            {metadata.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex flex-col gap-1 p-3 min-w-0",
                  "rounded-[var(--vision-radius-small)]",
                  "bg-[var(--surface-base)]",
                  "border border-[var(--border-subtle)]",
                  "transition-colors duration-300",
                  "group-hover:border-[var(--border-default)]",
                  item.variant === 'accent' && "bg-fundacion-verde/5 border-fundacion-verde/20",
                  item.variant === 'muted' && "opacity-60"
                )}
              >
                {/* Label row */}
                <div className="flex items-center gap-1.5">
                  {item.icon && (
                    <item.icon
                      className="w-3 h-3 shrink-0 text-[var(--text-tertiary)]"
                    />
                  )}
                  <span className="vision-caption-upper vision-text-tertiary truncate leading-none">
                    {item.label}
                  </span>
                </div>

                {/* Value */}
                <div className={cn(
                  "vision-text-secondary font-semibold text-[12px] leading-snug",
                  "truncate"
                )}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════
            ZONE 4: FOOTER (optional contextual strip)
            ══════════════════════════════════════════ */}
        {footer && (
          <div
            className={cn(
              "pt-4 border-t border-[var(--border-subtle)]",
              "flex items-center justify-between gap-3"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {footer}
          </div>
        )}
      </VisionGlassWindow>
    </div>
  );
}
