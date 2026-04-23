"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { VisionConfirmDialog } from "@/core/components/ui/VisionConfirmDialog";

interface ConfirmOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "brand" | "warning";
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  confirmDelete: (itemName: string, customDescription?: string) => Promise<boolean>;
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

  const confirmDelete = useCallback((itemName: string, customDescription?: string) => {
    return confirm({
      title: "¿Eliminar Registro?",
      description: customDescription || `¿Estás seguro de que deseas eliminar permanentemente "${itemName}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar Ahora",
      variant: "destructive"
    });
  }, [confirm]);

  const handleCancel = () => {
    setOpen(false);
    resolvePromise?.(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    resolvePromise?.(true);
  };

  return (
    <ConfirmContext.Provider value={{ confirm, confirmDelete }}>
      {children}
      <VisionConfirmDialog
        isOpen={open}
        onOpenChange={setOpen}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        variant={options.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (context === undefined) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
};
