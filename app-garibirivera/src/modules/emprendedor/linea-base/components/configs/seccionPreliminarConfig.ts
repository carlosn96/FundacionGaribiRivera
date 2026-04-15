// src/config/seccionPreliminarConfig.ts

import { StepConfig } from '@/core/components/step-form';
import { MedioConocimientoData, TiempoCapacitacionData, RazonRecurreData, SolicitaCreditoData, UtilizaCreditoData } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBase';

export type CatalogosSeccionPreliminar = {
  medioConocimiento: MedioConocimientoData;
  razonRecurre: RazonRecurreData;
  solicitaCredito: SolicitaCreditoData;
  utilizaCredito: UtilizaCreditoData;
  tiempoCapacitacion: TiempoCapacitacionData;
};

export const createInformacionPreliminarConfig = (catalogs: CatalogosSeccionPreliminar): StepConfig => {
  // Crear mapa de ID a descripción para validación por string
  const razonRecurreMap = new Map(
    catalogs.razonRecurre.data.map(opt => [opt.id_razon, opt.descripcion])
  );

  return {
    id: 'preliminar',
    title: 'Información Preliminar',
    description: 'Datos iniciales sobre cómo conociste la Fundación y tus necesidades',
    fields: [
      {
        name: 'medioConocimiento',
        label: '¿Cómo te enteraste de la Fundación?',
        type: catalogs.medioConocimiento.tipo as 'select',
        options: [...catalogs.medioConocimiento.data, { id_medio: 0, descripcion: 'Otro' }],
        idKey: 'id_medio',
        valueKey: 'descripcion',
        required: true,
        allowOther: true,
      },
      {
        name: 'tiempoCapacitacion',
        label: '¿Cuánto tiempo a la semana puedes dedicar para formarte/capacitarte de manera permanente?',
        type: catalogs.tiempoCapacitacion.tipo as 'select',
        options: catalogs.tiempoCapacitacion.data,
        idKey: 'id_tiempo',
        valueKey: 'descripcion',
        required: true
      },
      {
        name: 'razonRecurre',
        label: 'Recurres a la Fundación para:',
        type: catalogs.razonRecurre.tipo as 'select',
        options: [...catalogs.razonRecurre.data, { id_razon: 0, descripcion: 'Otro' }],
        idKey: 'id_razon',
        valueKey: 'descripcion',
        required: true,
        allowOther: true,
      },
      {
        name: 'solicitaCredito',
        label: 'El crédito lo solicitarías para:',
        type: catalogs.solicitaCredito.tipo as 'select',
        options: catalogs.solicitaCredito.data,
        idKey: 'id_solicitud',
        valueKey: 'descripcion',
        required: true,
        placeholder: 'Selecciona una opción...',
        condition: (formData) => {
          const selectedId = formData['razonRecurre'];
          if (!selectedId) return false;

          const descripcion = razonRecurreMap.get(Number(selectedId));
          if (!descripcion) return false;

          return descripcion.toLowerCase().includes('crédito');
        }
      },
      {
        name: 'utilizaCredito',
        label: 'El crédito lo utilizarías para:',
        type: catalogs.utilizaCredito.tipo as 'select',
        options: catalogs.utilizaCredito.data,
        idKey: 'id_utilidad',
        valueKey: 'descripcion',
        required: true,
        placeholder: 'Selecciona una opción...',
        condition: (formData) => {
          const selectedId = formData['razonRecurre'];
          if (!selectedId) return false;

          const descripcion = razonRecurreMap.get(Number(selectedId));
          if (!descripcion) return false;

          return descripcion.toLowerCase().includes('crédito');
        }
      }
    ]
  };
}
