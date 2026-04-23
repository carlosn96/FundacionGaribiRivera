"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/core/components/ui/alert-dialog";
import { Button } from "@/core/components/ui/button";
import { AlertTriangle, Trash2, HelpCircle } from "lucide-react";
import { cn } from "@/core/utils/utils";

export interface VisionConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "brand" | "warning";
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

export function VisionConfirmDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "brand",
  onConfirm,
  onCancel,
  loading = false,
}: VisionConfirmDialogProps) {
  
  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return <Trash2 className="w-6 h-6" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return <HelpCircle className="w-6 h-6" />;
    }
  };

  const getIconContainerClass = () => {
    switch (variant) {
      case "destructive":
        return "bg-red-500/10 text-red-500";
      case "warning":
        return "bg-fundacion-amarillo/10 text-fundacion-amarillo-dark";
      default:
        return "bg-fundacion-verde/10 text-fundacion-verde";
    }
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfirm();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="vision-glass max-w-md border-subtle p-0 overflow-hidden shadow-2xl">
        <div className="p-8">
          <AlertDialogHeader>
            <div className="flex items-center gap-5 mb-4">
              <div className={cn("p-4 rounded-2xl shrink-0 transition-transform duration-500 hover:scale-110", getIconContainerClass())}>
                {getIcon()}
              </div>
              <div className="flex flex-col gap-1">
                <AlertDialogTitle className="text-xl font-black tracking-tight text-[var(--text-primary)] leading-tight uppercase">
                  {title}
                </AlertDialogTitle>
                <div className="h-0.5 w-12 bg-fundacion-amarillo rounded-full" />
              </div>
            </div>
            <AlertDialogDescription className="vision-text-secondary font-medium leading-relaxed">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-10 gap-3">
            <Button 
              variant="visionGlass" 
              onClick={handleCancel} 
              disabled={loading}
              className="rounded-2xl flex-1 h-12 uppercase tracking-widest text-[10px] font-black"
            >
              {cancelText}
            </Button>
            <Button 
              variant={variant === "destructive" ? "visionDestructive" : "visionPrimary"} 
              onClick={handleConfirm}
              disabled={loading}
              className={cn(
                "rounded-2xl flex-1 h-12 uppercase tracking-widest text-[10px] font-black shadow-lg",
                variant === "destructive" && "hover:bg-red-500 hover:text-white transition-all duration-300"
              )}
            >
              {loading ? "Procesando..." : confirmText}
            </Button>
          </AlertDialogFooter>
        </div>
        
        {/* Decoración inferior */}
        <div className={cn(
          "h-1.5 w-full",
          variant === "destructive" ? "bg-red-500" : "bg-fundacion-verde"
        )} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
