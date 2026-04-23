"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Layers } from "lucide-react";
import { EtapaFormacion } from "../../domain/models/Etapa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";

interface EtapaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<EtapaFormacion>) => Promise<void>;
  etapaToEdit?: EtapaFormacion | null;
  tiposEtapa?: {id: number, descripcion: string}[];
}

export function EtapaFormModal({ isOpen, onClose, onSave, etapaToEdit, tiposEtapa = [] }: EtapaFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<EtapaFormacion>>({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    idTipo: 1,
    modalidad: 1,
    esActual: false,
  });

  useEffect(() => {
    if (etapaToEdit) {
      setFormData({
        nombre: etapaToEdit.nombre,
        fechaInicio: etapaToEdit.fechaInicio,
        fechaFin: etapaToEdit.fechaFin,
        idTipo: etapaToEdit.idTipo || 1,
        modalidad: etapaToEdit.modalidad || 1,
        esActual: etapaToEdit.esActual,
      });
    } else {
      setFormData({
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
        idTipo: 1,
        modalidad: 1,
        esActual: false,
      });
    }
  }, [etapaToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving etapa:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSelectChange = (name: keyof EtapaFormacion, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-0 glassmorphism shadow-2xl overflow-hidden border-zinc-200/50">
        <DialogHeader className="p-8 pb-4 bg-gradient-to-br from-fundacion-verde to-fundacion-verde-dark text-white">
          <DialogTitle className="text-2xl font-black tracking-tight uppercase flex items-center gap-4">
            <Layers className="w-8 h-8" />
            {etapaToEdit ? "Editar Etapa" : "Nueva Etapa"}
          </DialogTitle>
          <DialogDescription className="text-zinc-100/70 font-medium">
            {etapaToEdit ? "Modifica los detalles de la etapa seleccionada." : "Configura un nuevo ciclo formativo para los emprendedores."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Nombre del Ciclo</label>
            <input 
              required
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-fundacion-verde/20 focus:border-fundacion-verde/50 transition-colors"
              placeholder="Ej. Etapa Primera 2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Fecha Inicio</label>
              <input 
                required
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio || ""}
                onChange={handleChange}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-fundacion-verde/20 focus:border-fundacion-verde/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Fecha Fin</label>
              <input 
                required
                type="date"
                name="fechaFin"
                value={formData.fechaFin || ""}
                onChange={handleChange}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-fundacion-verde/20 focus:border-fundacion-verde/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Tipo</label>
              <Select value={formData.idTipo?.toString()} onValueChange={(val) => handleSelectChange('idTipo', val)}>
                <SelectTrigger className="w-full h-[46px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-bold focus:ring-fundacion-verde/20">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                  {tiposEtapa.map((tipo) => (
                    <SelectItem 
                      key={tipo.id} 
                      value={tipo.id.toString()} 
                      className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 cursor-pointer"
                    >
                      {tipo.descripcion}
                    </SelectItem>
                  ))}
                  {tiposEtapa.length === 0 && (
                    <SelectItem value="1" className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 cursor-pointer">Cargando...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Modalidad</label>
              <Select value={formData.modalidad?.toString()} onValueChange={(val) => handleSelectChange('modalidad', val)}>
                <SelectTrigger className="w-full h-[46px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-bold focus:ring-fundacion-verde/20">
                  <SelectValue placeholder="Selecciona modalidad" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                  <SelectItem value="1" className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 cursor-pointer">Presencial</SelectItem>
                  <SelectItem value="2" className="font-bold py-3 pr-8 focus:bg-fundacion-verde/5 focus:text-fundacion-verde rounded-lg mx-1 mt-1 cursor-pointer">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading} className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-700">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest bg-fundacion-verde hover:bg-fundacion-verde-dark text-white shadow-lg shadow-fundacion-verde/20 transition-all">
              {loading ? "Guardando..." : "Guardar Etapa"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
