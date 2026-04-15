import { StepConfig } from '@/core/components/step-form';
import {
    CantidadDependientesEconomicosData,
    IngresoMensualData,
    OcupacionActualData
} from '@/modules/emprendedor/linea-base/domain/schemas/lineaBase';

export type CatalogosSeccionSocioeconomico = {
    cantidadDependientesEconomicos: CantidadDependientesEconomicosData;
    ocupacionActual: OcupacionActualData;
    ingresoMensual: IngresoMensualData;
};

export const createSocioeconomicoConfig = (catalogs: CatalogosSeccionSocioeconomico): StepConfig => {
    return {
        id: 'socioeconomico',
        title: 'Socioeconómico Preliminar',
        description: 'Información socioeconómica básica del emprendedor',
        fields: [
            {
                name: 'cantidadDependientesEconomicos',
                label: 'Cantidad de Dependientes Económicos',
                type: catalogs.cantidadDependientesEconomicos.tipo ,
                required: true,
                options: catalogs.cantidadDependientesEconomicos.data,
                idKey: 'id_cantidad',
                valueKey: 'descripcion',
                placeholder: 'Seleccione cantidad de dependientes económicos',
            },
            {
                name: 'ocupacionActual',
                label: 'Ocupación Actual',
                type: 'select',
                required: true,
                options: catalogs.ocupacionActual.data,
                idKey: 'id_ocupacion',
                valueKey: 'descripcion',
                placeholder: 'Seleccione su ocupación actual',
            },
            {
                name: 'ingresoMensual',
                label: 'Rango de Ingreso Mensual',
                type: 'select',
                required: true,
                options: catalogs.ingresoMensual.data,
                idKey: 'id_rango',
                valueKey: 'descripcion',
                placeholder: 'Seleccione rango de ingreso mensual',
            },
        ],
    };
};
