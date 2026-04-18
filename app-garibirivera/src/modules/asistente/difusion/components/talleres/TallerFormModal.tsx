"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Presentation } from "lucide-react";
import { Taller } from "../../domain/models/Taller";
import { Instructor } from "../../domain/models/Instructor";
import { CorporateSelect } from "@/core/components/ui/CorporateSelect";
import { Switch } from "@/core/components/ui/switch";

interface TallerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Taller>) => Promise<void>;
  tallerToEdit?: Taller | null;
  instructores?: Instructor[];
  tiposTaller?: { id: number; descripcion: string }[];
}

export function TallerFormModal({ isOpen, onClose, onSave, tallerToEdit, instructores = [], tiposTaller = [] }: TallerFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Taller>>({
    nombre: "",
    numeroTaller: 1,
    idTipoTaller: 1,
    idInstructor: 0,
    observaciones: "",
    evaluacionHabilitada: false,
  });

  useEffect(() => {
    if (tallerToEdit) {
      setFormData({
        nombre: tallerToEdit.nombre,
        numeroTaller: tallerToEdit.numeroTaller,
        idTipoTaller: tallerToEdit.idTipoTaller || 1,
        idInstructor: tallerToEdit.idInstructor,
        observaciones: tallerToEdit.observaciones || "",
        evaluacionHabilitada: tallerToEdit.evaluacionHabilitada,
      });
    } else {
      setFormData({
        nombre: "",
        numeroTaller: 1,
        idTipoTaller: 1,
        idInstructor: instructores.length > 0 ? instructores[0].idInstructor : 0,
        observaciones: "",
        evaluacionHabilitada: false,
      });
    }
  }, [tallerToEdit, isOpen, instructores]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving taller:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value
    }));
  };

  const handleSelectChange = (name: keyof Taller, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      evaluacionHabilitada: checked
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-lg p-0 glassmorphism shadow-2xl overflow-hidden border-zinc-200/50">
        <DialogHeader className="p-8 pb-4 bg-gradient-to-br from-fundacion-verde to-fundacion-verde-dark text-white">
          <DialogTitle className="text-2xl font-black tracking-tight uppercase flex items-center gap-4">
            <Presentation className="w-8 h-8" />
            {tallerToEdit ? "Editar Taller" : "Nuevo Taller"}
          </DialogTitle>
          <DialogDescription className="text-zinc-100/70 font-medium">
            {tallerToEdit ? "Modifica los detalles operativos del taller seleccionado." : "Configura un nuevo taller para los emprendedores vinculados."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">
             Nombre del Taller
            </label>
            <input 
              required
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-fundacion-verde/20 focus:border-fundacion-verde/50 transition-colors"
              placeholder={"Ej. Modelo de Negocio"}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest ml-1 opacity-60">Secuencia (1 a 15)</label>
              <input 
                required
                type="number"
                min="1"
                max="15"
                name="numeroTaller"
                value={formData.numeroTaller}
                onChange={handleChange}
                className="w-full h-[46px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-[3px] focus:ring-fundacion-verde/10 focus:border-fundacion-verde/30 transition-all outline-none"
              />
            </div>
            
            <CorporateSelect
              label="Módulo"
              placeholder="Selecciona el tipo"
              value={formData.idTipoTaller}
              onValueChange={(val) => handleSelectChange('idTipoTaller', val)}
              options={tiposTaller.map(t => ({ value: t.id, label: t.descripcion }))}
              loading={tiposTaller.length === 0}
            />
          </div>

          <CorporateSelect
            label="Instructor Asignado"
            placeholder="Selecciona un instructor"
            value={formData.idInstructor}
            onValueChange={(val) => handleSelectChange('idInstructor', val)}
            options={instructores.map(i => ({ 
              value: i.idInstructor, 
              label: i.nombreCompleto || `${i.nombre} ${i.apellidoPaterno}` 
            }))}
            loading={instructores.length === 0}
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Observaciones</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={2}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-fundacion-verde/20 focus:border-fundacion-verde/50 transition-colors resize-none"
              placeholder={tallerToEdit ? "Notas o requerimientos..." : "Detalles extra..."}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="space-y-0.5">
              <label className="text-xs font-black vision-text-primary uppercase tracking-widest">Evaluación habilitada</label>
              <p className="text-[10px] text-zinc-500 font-medium">Permite registrar calificaciones</p>
            </div>
            <Switch
              checked={formData.evaluacionHabilitada}
              onCheckedChange={handleSwitchChange}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading} className="w-full sm:w-auto rounded-xl px-6 font-bold text-xs uppercase tracking-widest border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-700">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto rounded-xl px-6 font-bold text-xs uppercase tracking-widest bg-fundacion-verde hover:bg-fundacion-verde-dark text-white shadow-lg shadow-fundacion-verde/20 transition-all">
              {loading ? "Guardando..." : (tallerToEdit ? "Guardar Cambios" : "Registrar Taller")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
