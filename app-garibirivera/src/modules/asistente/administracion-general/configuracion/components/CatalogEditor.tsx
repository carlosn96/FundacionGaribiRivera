"use client";

import React from 'react';
import { VisionGlassWindow } from '@/core/components/ui/vision-glass';
import { Database, Plus, Trash2, Settings } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { CatalogMap, CatalogEntry, CatalogItem } from '@/modules/asistente/administracion-general/configuracion/schemas/configuracion.schema';
import { useConfirm } from '@/core/context/ConfirmContext';

interface CatalogEditorProps {
  selectedCatalog: string;
  catalogos: CatalogMap | null;
  newValue: string;
  setNewValue: (val: string) => void;
  handleAdd: () => void;
  handleDelete: (id: number) => void;
}

export function CatalogEditor({
  selectedCatalog,
  catalogos,
  newValue,
  setNewValue,
  handleAdd,
  handleDelete
}: CatalogEditorProps) {
  const { confirmDelete } = useConfirm();
  const catalogEntry = selectedCatalog ? (catalogos?.[selectedCatalog] as CatalogEntry) : null;

  return (
    <VisionGlassWindow className="lg:col-span-8 p-6 space-y-6 border-fundacion-amarillo/20 shadow-xl min-h-[500px] bg-[var(--surface-base)]">
      {selectedCatalog && catalogEntry ? (
        <>
          <div className="flex items-center justify-between border-b border-fundacion-amarillo/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-vision-md bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold vision-text-primary capitalize">{selectedCatalog.replace(/_/g, ' ')}</h3>
                <p className="text-xs vision-text-secondary">Editor de valores disponibles</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Input 
              placeholder="Nuevo valor..." 
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="bg-[var(--surface-raised)] border-[var(--border-default)] focus:border-fundacion-amarillo/50"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button 
              onClick={handleAdd}
              className="rounded-vision-md bg-fundacion-verde text-white hover:bg-fundacion-verde/90"
              disabled={!newValue.trim()}
            >
              <Plus className="w-4 h-4 mr-2" /> Agregar
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-disabled)] mb-3">Valores Registrados</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(catalogEntry.data || []).map((item: CatalogItem, idx: number) => (
                <div 
                  key={item.id || `item-${idx}`} 
                  className="flex items-center justify-between p-3 rounded-vision-md bg-[var(--surface-base)] border border-[var(--border-subtle)] group hover:border-fundacion-verde/50 transition-all"
                >
                  <span className="text-sm font-medium vision-text-primary truncate pr-4">
                    {item.descripcion || item.nombre}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={async () => {
                      const label = item.descripcion || item.nombre || "este elemento";
                      const isConfirmed = await confirmDelete(label);
                      if (isConfirmed) handleDelete((item as any).id || (item as any).id_rubro || (item as any).id_catalogo_estado_civil);
                    }}
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {(catalogEntry.data?.length || 0) === 0 && (
                <div className="col-span-full py-12 text-center text-[var(--text-disabled)] font-medium italic">
                  No hay valores registrados en este catálogo yet.
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-[var(--text-disabled)]">
          <Settings className="w-16 h-16 mb-4 opacity-10" />
          <p>Selecciona un catálogo para comenzar a administrar sus valores.</p>
        </div>
      )}
    </VisionGlassWindow>
  );
}
