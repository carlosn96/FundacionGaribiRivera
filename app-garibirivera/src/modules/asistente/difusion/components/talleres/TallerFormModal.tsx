"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Presentation } from "lucide-react";
import { Taller } from "../../domain/models/Taller";
import { Instructor } from "../../domain/models/Instructor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";
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
            {tallerToEdit ? "Editar Sesión / Taller" : "Nueva Sesión / Taller"}
          </DialogTitle>
          <DialogDescription className="text-zinc-100/70 font-medium">
            {tallerToEdit ? "Modifica los detalles operativos del taller seleccionado." : "Configura un nuevo taller para los emprendedores vinculados."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">
              {tallerToEdit ? "Nombre del Taller" : "Nombre de la Sesión"}
            </label>
            <input 
              required
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-fundacion-verde/20 focus:border-fundacion-verde/50 transition-colors"
              placeholder={tallerToEdit ? "Ej. Modelo de Negocio con Alma" : "Ej. Aspectos Legales y Laborales"}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Secuencia (1 a 15)</label>
              <input 
                required
                type="number"
                min="1"
                max="15"
                name="numeroTaller"
                value={formData.numeroTaller}
                onChange={handleChange}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-fundacion-verde/20 focus:border-fundacion-verde/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Módulo</label>
              <Select value={formData.idTipoTaller?.toString()} onValueChange={(val) => handleSelectChange('idTipoTaller', val)}>
                <SelectTrigger className="w-full h-[46px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-bold focus:ring-fundacion-verde/20">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                  {tiposTaller.map((tipo) => (
                    <SelectItem 
                      key={tipo.id} 
                      value={tipo.id.toString()} 
                      className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 cursor-pointer"
                    >
                      {tipo.descripcion}
                    </SelectItem>
                  ))}
                  {tiposTaller.length === 0 && (
                    <SelectItem value="1" className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 cursor-pointer">Cargando...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Instructor Asignado</label>
            <Select value={formData.idInstructor?.toString()} onValueChange={(val) => handleSelectChange('idInstructor', val)}>
              <SelectTrigger className="w-full h-[46px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-bold focus:ring-fundacion-verde/20">
                <SelectValue placeholder="Selecciona un instructor" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl max-h-60">
                {instructores.map((instructor) => (
                  <SelectItem 
                    key={instructor.idInstructor} 
                    value={instructor.idInstructor.toString()} 
                    className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 cursor-pointer"
                  >
                    {instructor.nombreCompleto || `${instructor.nombre} ${instructor.apellidoPaterno}`}
                  </SelectItem>
                ))}
                {instructores.length === 0 && (
                  <SelectItem value="0" className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 cursor-pointer">Sin instructores</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

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
