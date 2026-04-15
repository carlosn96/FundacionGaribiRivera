import { StepConfig } from '@/core/components/step-form';
import { LINEA_BASE_ENDPOINTS } from '@/modules/emprendedor/linea-base/constants';
import { buscarCodigosPostales, buscarComunidadesParroquiales } from '@/modules/emprendedor/linea-base/application/services/lineaBase';


export const createDomicilioConfig = (): StepConfig => {
    return {
        id: 'domicilio',
        title: 'Domicilio',
        description: 'Información de domicilio del emprendedor',
        fields: [
            {
                name: 'codigoPostal',
                label: 'Código Postal',
                type: 'autocomplete',
                required: true,
                cacheKey: 'codigosPostales',
                valueLabelField: 'codigoPostalLabel',
                searchFunction: buscarCodigosPostales,
                placeholder: 'Buscar código postal o colonia',
                searchPlaceholder: 'Ej: 45607 o Lomas de La Victoria',
                noResultsText: 'No se encontraron códigos postales.',
                loadingText: 'Buscando...',
                debounceTime: 100,
                minQueryLength: 3,
                onSelect: (selectedOption, setFieldValue) => {
                    setFieldValue('codigoPostalLabel', selectedOption.label || '');
                    // Llenar automáticamente los campos relacionados
                    if (selectedOption.estado) {
                        setFieldValue('estado', selectedOption.estado);
                    }
                    if (selectedOption.municipio) {
                        setFieldValue('municipio', selectedOption.municipio);
                    }
                    if (selectedOption.colonia) {
                        setFieldValue('colonia', selectedOption.colonia);
                    }
                },
                onClear: (setFieldValue) => {
                    setFieldValue('codigoPostalLabel', '');
                    // Limpiar los campos relacionados cuando se borra el código postal
                    setFieldValue('estado', '');
                    setFieldValue('municipio', '');
                    setFieldValue('colonia', '');
                },
            },
            {
                name: 'estado',
                label: 'Estado',
                type: 'text',
                required: true,
                placeholder: 'Ej: Jalisco',
                readOnly: true,
            },
            {
                name: 'municipio',
                label: 'Municipio',
                type: 'text',
                required: true,
                placeholder: 'Ej: Tlaquepaque',
                readOnly: true,
            },
            {
                name: 'colonia',
                label: 'Colonia',
                type: 'text',
                required: true,
                placeholder: 'Ej: Lomas de La Victoria',
                maxLength: 100,
            },
            {
                name: 'calle',
                label: 'Calle',
                type: 'text',
                required: true,
                placeholder: 'Ej: Avenida Principal',
                maxLength: 60,
            },
            {
                name: 'numeroExterior',
                label: 'Número Exterior',
                type: 'text',
                required: true,
                placeholder: 'Ej: 123',
                maxLength: 10,
            },
            {
                name: 'numeroInterior',
                label: 'Número Interior',
                type: 'text',
                required: false,
                placeholder: 'Ej: 4A (opcional)',
                maxLength: 10,
            },
            {
                name: 'calleCruce1',
                label: 'Entre Calle',
                type: 'text',
                required: true,
                placeholder: 'Ej: Calle Primera',
                maxLength: 60,
            },
            {
                name: 'calleCruce2',
                label: 'Y Calle',
                type: 'text',
                required: true,
                placeholder: 'Ej: Calle Segunda',
                maxLength: 60,
            },
            {
                name: 'comunidadParroquial',
                label: 'Comunidad Parroquial',
                type: 'autocomplete',
                required: true,
                condition: (data) => !Boolean(data.noConozcoComunidadParroquial),
                cacheKey: 'comunidadesParroquiales',
                valueLabelField: 'comunidadParroquialLabel',
                searchFunction: buscarComunidadesParroquiales,
                placeholder: 'Buscar comunidad parroquial',
                searchPlaceholder: 'Ej: San Pedro, Apóstol',
                noResultsText: 'No se encontraron comunidades parroquiales.',
                loadingText: 'Buscando...',
                debounceTime: 100,
                minQueryLength: 3,
                onSelect: (selectedOption, setFieldValue) => {
                    setFieldValue('comunidadParroquialLabel', selectedOption.label || '');
                    // Llenar automáticamente los campos relacionados
                    if (selectedOption.vicaria) {
                        setFieldValue('vicaria', selectedOption.vicaria);
                    }
                    if (selectedOption.decanato) {
                        setFieldValue('decanato', selectedOption.decanato);
                    }
                },
                onClear: (setFieldValue) => {
                    setFieldValue('comunidadParroquialLabel', '');
                    // Limpiar los campos relacionados cuando se borra la comunidad parroquial
                    setFieldValue('vicaria', '');
                    setFieldValue('decanato', '');
                },
            },
            {
                name: 'noConozcoComunidadParroquial',
                label: 'No conozco mi comunidad parroquial',
                type: 'checkbox',
                required: false,
                isChecked: false,
                onChange: (value, _data, setFieldValue) => {
                    if (value) {
                        setFieldValue('comunidadParroquial', '');
                        setFieldValue('comunidadParroquialLabel', '');
                        setFieldValue('vicaria', '');
                        setFieldValue('decanato', '');
                    }
                },
            },
            {
                name: 'vicaria',
                label: 'Vicaria',
                type: 'text',
                required: true,
                condition: (data) => !Boolean(data.noConozcoComunidadParroquial),
                placeholder: 'Ej: El Santuario de Guadalupe',
                readOnly: true,
            },
            {
                name: 'decanato',
                label: 'Decanato',
                type: 'text',
                required: true,
                condition: (data) => !Boolean(data.noConozcoComunidadParroquial),
                placeholder: 'Ej: La Paz',
                readOnly: true,
            },
        ],
    };
};
