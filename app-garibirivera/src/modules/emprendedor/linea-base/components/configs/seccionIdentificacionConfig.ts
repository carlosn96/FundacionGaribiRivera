import { StepConfig } from '@/core/components/step-form';
import { EstadoCivilData, EscolaridadData, GeneroData } from '@/modules/emprendedor/linea-base/domain/models/lineaBase';

export type CatalogosSeccionIdentificacion = {
    estadoCivil: EstadoCivilData;
    escolaridad: EscolaridadData;
    genero: GeneroData;
};

export const createIdentificacionConfig = (catalogs: CatalogosSeccionIdentificacion): StepConfig => {
    return {
        id: 'identificacion',
        title: 'Identificación',
        description: 'Información personal básica',
        fields: [
            {
                name: 'edad',
                label: 'Edad',
                type: 'number',
                required: true,
                min: 18,
                max: 100,
                step: 1,
                initialValue: 18,
            },
            {
                name: catalogs.genero.name,
                label: 'Género',
                type: catalogs.genero.tipo,
                required: true,
                options: catalogs.genero.data,
                idKey: 'id_genero',
                valueKey: 'descripcion',
            },
            {
                name: 'estadoCivil',
                label: 'Estado Civil',
                type: catalogs.estadoCivil.tipo,
                options: catalogs.estadoCivil.data,
                idKey: 'id_estado_civil',
                valueKey: 'descripcion',
                required: true,
            },
            {
                name: 'escolaridad',
                label: 'Escolaridad',
                type: catalogs.escolaridad.tipo,
                options: catalogs.escolaridad.data,
                idKey: 'id_escolaridad',
                valueKey: 'descripcion',
                required: true,
            },
            {
                name: 'discapacidad',
                label: '¿Presentas alguna discapacidad?',
                type: 'radio',
                required: true,
                yesNoMode: true,
                yesFields: [
                    {
                        name: 'tipoDiscapacidad',
                        label: '¿Sí?, ¿Cuál?',
                        placeholder: 'Especifica',
                        type: 'text',
                        required: true,
                    }
                ],
            },
        ],
    };
};
