"use client";

import { useState } from "react";
import { KeyRound, ShieldCheck, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/core/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Emprendedor } from "../../domain/models/Emprendedor";

interface ResetPasswordModalProps {
  emprendedor: Emprendedor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number, password?: string) => Promise<any>;
  loading?: boolean;
}

export function ResetPasswordModal({
  emprendedor,
  isOpen,
  onClose,
  onConfirm,
  loading,
}: ResetPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [result, setResult] = useState<{ contrasena: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emprendedor || (!autoGenerate && !password)) return;
    try {
      const data = await onConfirm(emprendedor.id, autoGenerate ? undefined : password);
      
      if (autoGenerate && data?.contrasena) {
        setResult(data);
      } else {
        handleClose();
      }
    } catch (error) {
      // Error handling is managed by useOperation/toast in the hook
    }
  };

  const handleCopy = () => {
    if (!result?.contrasena) return;
    navigator.clipboard.writeText(result.contrasena);
    setCopied(true);
    toast.success("Contraseña copiada al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setPassword("");
    setAutoGenerate(false);
    setResult(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-2xl bg-fundacion-amarillo/10 text-fundacion-amarillo ring-1 ring-fundacion-amarillo/20 shadow-inner">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold vision-text-primary tracking-tight">
                Restablecer Contraseña
              </DialogTitle>
              <DialogDescription className="vision-caption-upper opacity-60">
                Seguridad de Cuenta
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {result ? (
          <div className="space-y-6 py-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-fundacion-verde/10 text-fundacion-verde flex items-center justify-center ring-4 ring-fundacion-verde/5">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold vision-text-primary">¡Contraseña Actualizada!</h3>
                <p className="text-xs vision-text-secondary max-w-[280px] mx-auto mt-1">
                  Se ha generado una nueva clave de acceso para <span className="font-bold text-fundacion-verde">{emprendedor?.nombre}</span>.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">
                Contraseña Temporal
              </Label>
              <div className="relative flex items-center justify-between p-4 rounded-xl bg-fundacion-amarillo/5 border border-fundacion-amarillo/10 group transition-all hover:bg-fundacion-amarillo/10">
                <code className="text-lg font-mono font-bold tracking-wider vision-text-primary break-all pr-12">
                  {result.contrasena}
                </code>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  className="absolute right-2 h-10 w-10 rounded-lg bg-white/50 hover:bg-white shadow-sm border border-black/5 active:scale-95 transition-all"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-fundacion-verde" />
                  ) : (
                    <Copy className="w-4 h-4 text-fundacion-amarillo" />
                  )}
                </Button>
              </div>
              <p className="text-[10px] vision-text-tertiary text-center opacity-60 px-4">
                Por favor, copia esta contraseña ahora. No volverá a mostrarse por razones de seguridad.
              </p>
            </div>

            <Button
              className="w-full bg-fundacion-amarillo hover:bg-fundacion-amarillo-dark text-white font-bold uppercase tracking-widest text-[10px] h-12 rounded-xl shadow-md shadow-fundacion-amarillo/20 transition-all"
              onClick={handleClose}
            >
              Cerrar y Continuar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-fundacion-verde/5 border border-fundacion-verde/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-fundacion-verde mt-0.5 shrink-0" />
                <p className="text-sm vision-text-secondary leading-relaxed">
                  Estás actualizando la contraseña para <span className="font-bold text-fundacion-verde">{emprendedor?.nombre} {emprendedor?.apellidos}</span>.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-fundacion-amarillo/5 border border-fundacion-amarillo/10 transition-all hover:bg-fundacion-amarillo/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-fundacion-amarillo/20 text-fundacion-amarillo">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <Label htmlFor="auto-generate" className="text-sm font-bold vision-text-primary cursor-pointer">
                      Generar Automáticamente
                    </Label>
                    <p className="text-[10px] vision-text-tertiary uppercase tracking-wider font-medium opacity-60">
                      El sistema creará una contraseña segura
                    </p>
                  </div>
                </div>
                <Switch 
                  id="auto-generate" 
                  checked={autoGenerate} 
                  onCheckedChange={setAutoGenerate}
                />
              </div>

              {!autoGenerate && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">
                    Nueva Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Escribe la nueva contraseña..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="vision-glass-input h-12 text-base"
                    autoFocus
                    required
                  />
                </div>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={loading}
                className="font-bold uppercase tracking-widest text-[10px] h-11"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading || (!autoGenerate && !password)}
                className="bg-fundacion-amarillo hover:bg-fundacion-amarillo-dark text-white font-bold uppercase tracking-widest text-[10px] h-11 px-8 shadow-lg shadow-fundacion-amarillo/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  "Guardar Nueva Contraseña"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
