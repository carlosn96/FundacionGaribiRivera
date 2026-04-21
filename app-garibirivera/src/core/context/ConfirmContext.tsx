"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/core/components/ui/alert-dialog";
import { Button } from "@/core/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "brand";
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    description: "",
  });
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>();

  const confirm = useCallback((newOptions: ConfirmOptions) => {
    const defaults: Partial<ConfirmOptions> = {
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      variant: "brand",
    };

    setOptions({ ...defaults, ...newOptions } as ConfirmOptions);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }, []);

  const handleCancel = () => {
    setOpen(false);
    resolvePromise?.(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    resolvePromise?.(true);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="vision-glass max-w-md border-subtle">
          <AlertDialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className={`p-3 rounded-2xl ${options.variant === 'destructive' ? 'bg-red-500/10 text-red-500' : 'bg-fundacion-amarillo/10 text-fundacion-amarillo'}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <AlertDialogTitle className="vision-title-3 lowercase first-letter:uppercase">
                {options.title}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="vision-text-tertiary">
              {options.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 gap-3">
            <Button variant="visionGlass" onClick={handleCancel} className="rounded-xl flex-1 uppercase tracking-widest text-[10px] font-black">
              {options.cancelText}
            </Button>
            <Button 
              variant={options.variant === "destructive" ? "visionDestructive" : "default"} 
              onClick={handleConfirm}
              className="rounded-xl flex-1 uppercase tracking-widest text-[10px] font-black shadow-lg"
            >
              {options.confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (context === undefined) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context.confirm;
};
