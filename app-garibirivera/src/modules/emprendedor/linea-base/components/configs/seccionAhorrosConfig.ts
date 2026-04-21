import { StepConfig } from '@/core/components/step-form';
import { ObjetivosAhorroData } from '@/modules/emprendedor/linea-base/domain/models/lineaBase';

export type CatalogosSeccionAhorros = {
    objetivosAhorro: ObjetivosAhorroData;
};

export const createAhorrosConfig = (catalogs: CatalogosSeccionAhorros): StepConfig => {
    const commonsParamsInputNumber = {
        type: 'number' as const,
        min: 0,
        required: true,
        initialValue: 0,
    };

    const commonsParamsInputQuestion = {
        type: 'radio' as const,
        yesNoMode: true,
        required: true,
    };

    return {
        id: 'ahorros',
        title: 'Hábitos de ahorro',
        description: 'Información sobre tus hábitos y sistemas de ahorro',
        fields: [
            {
                name: "tieneHabitoAhorro",
                label: "¿Tienes el hábito de ahorrar de manera constante y a largo plazo?",
                ...commonsParamsInputQuestion
            },
            {
                name: "cuentaConSistemaAhorro",
                label: "¿Cuentas con algún sistema de ahorro?",
                ...commonsParamsInputQuestion,
                yesFields: [
                    {
                        name: 'tipoSistemaAhorro',
                        label: '¿Con qué sistema de ahorro cuentas?',
                        placeholder: 'Describe el sistema de ahorro',
                        type: 'text',
                        required: true,
                    },
                    {
                        ...commonsParamsInputNumber,
                        name: "ahorroMensual",
                        label: "¿Cuál es el monto aproximado de tus ahorros mensuales?",
                    }
                ]
            },
            {
                name: 'objetivosAhorro',
                label: '¿Cuál es el objetivo principal de tus ahorros?',
                type: 'radio',
                required: true,
                options: catalogs.objetivosAhorro.data,
                idKey: 'id_objetivo',
                valueKey: 'descripcion',
            }
        ],
    };
};
