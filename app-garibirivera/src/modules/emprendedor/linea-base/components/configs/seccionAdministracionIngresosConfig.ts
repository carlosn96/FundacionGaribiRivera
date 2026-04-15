import { StepConfig } from '@/core/components/step-form';

export const createAdministracionIngresosConfig = (): StepConfig => {
    const conditionCommon = (data: Record<string, unknown>) => data.tieneNegocio === 1;

    const commonsParamsInputNumber = {
        type: 'number' as const,
        min: 0,
        required: true,
        initialValue: "0",
    };

    const camposNumericosLProps = [
        { name: "montoVentasMensual", label: "¿Cuál es el monto mensual de tus <b>ventas</b>?" },
        { name: "montoGastosMensual", label: "¿Cuál es el monto mensual de tus <b>gastos/egresos</b>?" },
        { name: "utilidadesMensual", label: "¿Cuál es el monto de tus <b>utilidades mensuales</b>?" },
        { name: "sueldoMensual", label: "¿Cuál es tu <b>sueldo mensual</b>?" }
    ];

    const commonsParamsInputQuestion = {
        type: 'radio' as const,
        yesNoMode: true,
        required: true,
    };

    const camposQuestionLProps = [
        { name: "esIngresoPrincipalPersonal", label: "¿Es tu negocio la principal fuente de ingresos <b>a nivel personal</b>? " },
        { name: "esIngresoPrincipalFamiliar", label: "¿Es tu negocio la principal fuente de ingresos <b>para tu familia</b>?" }
    ];

    return {
        id: 'administracionIngresos',
        title: 'Administración financiera de tu negocio',
        description: 'Información sobre la gestión financiera, ingresos y gastos de tu negocio',
        fields: [
            ...camposNumericosLProps.map(field => {
                return { ...field, ...commonsParamsInputNumber, condition: conditionCommon };
            }),
            ...camposQuestionLProps.map(field => {
                return { ...field, ...commonsParamsInputQuestion, condition: conditionCommon };
            }),
            {
                name: 'mensajeNoNegocio',
                label: '',
                type: 'alert',
                variant: 'warning',
                title: 'Atención',
                description: 'Se ha indicado que actualmente no se cuenta un negocio. Continua con el formulario en la siguiente sección.',
                condition: (data) => data.tieneNegocio === 0,
            },
        ],
    };
};
