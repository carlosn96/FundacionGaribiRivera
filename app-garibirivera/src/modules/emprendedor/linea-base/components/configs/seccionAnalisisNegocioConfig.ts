// src/components/lineaBase/configs/seccionAnalisisNegocioDetalladoConfig.ts

import { StepConfig } from '@/core/components/step-form';
import { EstrategiasIncrementarVentasData, ComoEmpleaGananciasData } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBase';

export type CatalogosSeccionAnalisisNegocio = {
    estrategiasIncrementarVentas: EstrategiasIncrementarVentasData;
    comoEmpleaGanancias: ComoEmpleaGananciasData;
};

export const createAnalisisNegocioConfig = (catalogs: CatalogosSeccionAnalisisNegocio): StepConfig => {
    const [keyIdEstrategias, keyValueEstrategias] = Object.keys(catalogs.estrategiasIncrementarVentas.data[0]);
    return {
        id: 'analisisNegocioDetallado',
        title: 'Análisis del Negocio',
        description: 'Evaluación detallada de aspectos operativos y financieros de tu negocio',
        fields: [
            {
                name: 'registraEntradaSalida',
                label: '¿Llevas registros de entradas y salidas de dinero?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'asignaSueldo',
                label: '¿Tienes asignado un sueldo?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'conoceUtilidades',
                label: '¿Conoces cuál es la utilidad mensual que te deja tu negocio?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'conoceProductosMayorUtilidad',
                label: '¿Conoces los productos o servicios que te generan mayor utilidad?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
                yesFields: [
                    {
                        name: 'porcentajeGananciasProductos',
                        label: '¿Cuál es el porcentaje de ganancias de esos productos?',
                        type: 'number',
                        min: 0,
                        step: 5,
                        required: true,
                    }
                ],
            },
            {
                name: 'identificaCompetencia',
                label: '¿Identificas quién es tu competencia?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
                yesFields: [
                    {
                        name: 'quienCompetencia',
                        label: '¿Quién es tu competencia?',
                        placeholder: 'Describe quién es tu competencia',
                        type: 'text',
                        required: true,
                    }
                ],
            },
            {
                name: 'clientesNegocio',
                label: '¿A quién le vendes? ¿Quiénes son tus clientes?',
                type: 'textarea',
                required: true,
                rows: 3,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'ventajasNegocio',
                label: '¿Cuáles consideras que son las ventajas de tu negocio sobre tu competencia? (Lo que te hace mejor y diferente: diferenciadores)',
                type: 'textarea',
                required: true,
                rows: 3,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'problemasNegocio',
                label: '¿Cuáles consideras que son los principales problemas de tu negocio?',
                type: 'textarea',
                required: true,
                rows: 3,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: catalogs.estrategiasIncrementarVentas.name,
                label: "¿Qué estrategias utilizas para incrementar tus ventas?",
                type: "checkbox",
                options: catalogs.estrategiasIncrementarVentas.data,
                idKey: keyIdEstrategias,
                valueKey: keyValueEstrategias,
                condition: (formData) => { return formData.tieneNegocio === 1; },
                onChange: (selectedOptions, formData, setFieldValue) => {
                    setFieldValue('noSeRespuestaEstrategias', !(selectedOptions as any[]).length);
                }
            },
            {
                name: "noSeRespuestaEstrategias",
                label: "No sé cómo responder si utilizo alguna estrategia para incrementar mis ventas",
                type: "checkbox",
                onChange: (noSeRespuesta, formData) => {
                    if (noSeRespuesta && Array.isArray(formData?.estrategiasIncrementarVentas)) {
                        formData.estrategiasIncrementarVentas.length = 0;
                    }
                },
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'comoEmpleaGanancias',
                label: '¿Cómo empleas las ganancias generadas?',
                type: 'radio',
                options: catalogs.comoEmpleaGanancias.data,
                idKey: 'id_empleo',
                valueKey: 'descripcion',
                required: true,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'asignaAhorroMensual',
                label: '¿Asignas ahorro mensual para mantenimiento de equipo o maquinaria?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
                yesFields: [
                    {
                        name: 'cuantoAhorro',
                        label: '¿Cuánto ahorras?',
                        type: 'number',
                        min: 1,
                        initialValue: 1,
                        required: true,
                    }
                ],
                noFields: [
                    {
                        name: 'razonesNoAhorro',
                        label: 'Razones por las cuales no ahorras',
                        type: 'textarea',
                        required: true,
                        rows: 2,
                    }
                ],
            },
            {
                name: 'conocePuntoEquilibrio',
                label: '¿Conoces el punto de equilibrio de tu negocio (cuánto tienes que vender para sacar tus gastos)?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'separaGastos',
                label: '¿Separas los gastos del negocio de tus gastos personales?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'elaboraPresupuesto',
                label: '¿Elaboras un presupuesto mensual para tu negocio (estimado de lo que esperas vender, gastar y ganar)?',
                type: 'radio',
                yesNoMode: true,
                required: true,
                condition: (data) => data.tieneNegocio === 1,
            },
            {
                name: 'mensajeNoNegocio',
                label: '',
                type: 'alert',
                variant: 'warning',
                title: 'Atención',
                description: 'Se ha indicado que actualmente no se cuenta un negocio. Continua con el formulario en la siguiente sección.',
                condition: (data) => data.tieneNegocio === 0,
            },

        ]
    };
};
