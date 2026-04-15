// src/components/lineaBase/configs/seccionAnalisisNegocioConfig.ts

import { StepConfig } from '@/core/components/step-form';
import { GiroNegocioData, ActividadNegocioData, AntiguedadNegocioData } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBase';
import { buscarCodigosPostales } from '@/modules/emprendedor/linea-base/application/services/lineaBase';

export type CatalogosSeccionInformacionGeneralNegocio = {
  antiguedadNegocio: AntiguedadNegocioData;
  giroNegocio: GiroNegocioData;
  actividadNegocio: ActividadNegocioData;
};

export const createInformacionGeneralNegocioConfig = (catalogs: CatalogosSeccionInformacionGeneralNegocio): StepConfig => {
  return {
    id: 'informacionGeneralNegocio',
    title: 'Información General del Negocio',
    description: 'Información sobre el negocio del emprendedor',
    fields: [
      {
        name: 'tieneNegocio',
        label: '¿Tienes negocio?',
        type: 'radio',
        yesNoMode: true,
        yesOption: 'Sí',
        noOption: 'No',
        isSelected: 0, // Valor inicial seleccionado
        required: true,
        yesFields: [
          {
            name: 'usarDomicilioParticular',
            label: 'Usar información del domicilio particular',
            type: 'checkbox',
            isChecked: false, // Valor inicial marcado
            required: false,
            onChange: (value, data, setFieldValue) => {
              if (value) {
                console.log('Copiando datos del domicilio particular al negocio');
                // Copiar valores de domicilio particular a negocio
                if (data.negocioCodigoPostal !== data.codigoPostal) setFieldValue('negocioCodigoPostal', data.codigoPostal || '');
                if (data.negocioCodigoPostalLabel !== data.codigoPostalLabel) setFieldValue('negocioCodigoPostalLabel', data.codigoPostalLabel || '');
                if (data.negocioEstado !== data.estado) setFieldValue('negocioEstado', data.estado || '');
                if (data.negocioMunicipio !== data.municipio) setFieldValue('negocioMunicipio', data.municipio || '');
                if (data.negocioColonia !== data.colonia) setFieldValue('negocioColonia', data.colonia || '');
                if (data.negocioCalle !== data.calle) setFieldValue('negocioCalle', data.calle || '');
                if (data.negocioCalleCruce1 !== data.calleCruce1) setFieldValue('negocioCalleCruce1', data.calleCruce1 || '');
                if (data.negocioCalleCruce2 !== data.calleCruce2) setFieldValue('negocioCalleCruce2', data.calleCruce2 || '');
                if (data.negocioNumeroExterior !== data.numeroExterior) setFieldValue('negocioNumeroExterior', data.numeroExterior || '');
                if (data.negocioNumeroInterior !== data.numeroInterior) setFieldValue('negocioNumeroInterior', data.numeroInterior || '');
              } else {
                // Si se desmarca, limpiar los campos copiados
                console.log('Limpiando datos copiados del domicilio particular');
                if (data.negocioTelefono !== '') setFieldValue('negocioTelefono', '');
                if (data.negocioCodigoPostal !== '') setFieldValue('negocioCodigoPostal', '');
                if (data.negocioCodigoPostalLabel !== '') setFieldValue('negocioCodigoPostalLabel', '');
                if (data.negocioEstado !== '') setFieldValue('negocioEstado', '');
                if (data.negocioMunicipio !== '') setFieldValue('negocioMunicipio', '');
                if (data.negocioColonia !== '') setFieldValue('negocioColonia', '');
                if (data.negocioCalle !== '') setFieldValue('negocioCalle', '');
                if (data.negocioCalleCruce1 !== '') setFieldValue('negocioCalleCruce1', '');
                if (data.negocioCalleCruce2 !== '') setFieldValue('negocioCalleCruce2', '');
                if (data.negocioNumeroExterior !== '') setFieldValue('negocioNumeroExterior', '');
                if (data.negocioNumeroInterior !== '') setFieldValue('negocioNumeroInterior', '');
              }
            },
          },
          {
            name: 'negocioNombre',
            label: 'Nombre del negocio',
            type: 'text',
            required: true,
            placeholder: 'Ingresa el nombre del negocio',
          },
          {
            name: 'negocioTelefono',
            label: 'Teléfono del negocio',
            type: 'tel',
            required: true,
            placeholder: 'Ingresa el teléfono del negocio',
            maxLength: 15,
          },
          {
            name: 'negocioCodigoPostal',
            label: 'Código Postal del negocio',
            type: 'autocomplete',
            required: true,
            cacheKey: 'codigosPostales',
            valueLabelField: 'negocioCodigoPostalLabel',
            searchFunction: buscarCodigosPostales,
            placeholder: 'Buscar código postal o colonia',
            searchPlaceholder: 'Ej: 45607 o Lomas de La Victoria',
            noResultsText: 'No se encontraron códigos postales.',
            loadingText: 'Buscando...',
            debounceTime: 100,
            minQueryLength: 3,
            onSelect: (selectedOption, setFieldValue) => {
              setFieldValue('negocioCodigoPostalLabel', selectedOption.label || '');
              if (selectedOption.estado) {
                setFieldValue('negocioEstado', selectedOption.estado);
              }
              if (selectedOption.municipio) {
                setFieldValue('negocioMunicipio', selectedOption.municipio);
              }
              if (selectedOption.colonia) {
                setFieldValue('negocioColonia', selectedOption.colonia);
              }
            },
            onClear: (setFieldValue) => {
              setFieldValue('negocioCodigoPostalLabel', '');
              setFieldValue('negocioEstado', '');
              setFieldValue('negocioMunicipio', '');
              setFieldValue('negocioColonia', '');
            },
          },
          {
            name: 'negocioEstado',
            label: 'Estado',
            type: 'text',
            required: true,
            readOnly: true,
          },
          {
            name: 'negocioMunicipio',
            label: 'Municipio',
            type: 'text',
            required: true,
            readOnly: true,
          },
          {
            name: 'negocioColonia',
            label: 'Colonia',
            type: 'text',
            required: true,
            placeholder: 'Ingresa la colonia',
            maxLength: 100,
          },
          {
            name: 'negocioCalle',
            label: 'Calle',
            type: 'text',
            required: true,
            placeholder: 'Ingresa la calle',
            maxLength: 60,
          },
          {
            name: 'negocioNumeroExterior',
            label: 'Número Exterior',
            type: 'text',
            required: true,
            placeholder: 'Ingresa el número exterior',
            maxLength: 10,
          },
          {
            name: 'negocioNumeroInterior',
            label: 'Número Interior',
            type: 'text',
            required: false,
            placeholder: 'Ingresa el número interior (opcional)',
            maxLength: 10,
          },
          {
            name: 'negocioCalleCruce1',
            label: 'Entre Calle',
            type: 'text',
            required: true,
            placeholder: 'Ej: Calle Primera',
            maxLength: 60,
          },
          {
            name: 'negocioCalleCruce2',
            label: 'Y Calle',
            type: 'text',
            required: true,
            placeholder: 'Ej: Calle Segunda',
            maxLength: 60,
          },
          {
            name: 'negocioAntiguedad',
            label: 'Antigüedad del negocio',
            type: catalogs.antiguedadNegocio.tipo as 'select',
            options: catalogs.antiguedadNegocio.data,
            idKey: 'id',
            valueKey: 'descripcion',
            required: true
          },

          {
            name: 'negocioCantidadEmpleados',
            label: 'Cantidad de empleados',
            type: 'number',
            required: true,
            placeholder: 'Ingresa la cantidad de empleados',
          },
          {
            name: 'negocioGiro',
            label: 'Giro del negocio',
            type: catalogs.giroNegocio.tipo as 'select',
            options: catalogs.giroNegocio.data,
            idKey: 'id_tipo_giro',
            valueKey: 'descripcion',
            required: true,
          },
          {
            name: 'negocioActividad',
            label: 'Actividad del negocio',
            type: catalogs.actividadNegocio.tipo as 'select',
            options: [...catalogs.actividadNegocio.data, { id_giro: 0, descripcion: 'Otro' }],
            idKey: 'id_giro',
            valueKey: 'descripcion',
            required: true,
            allowOther: true,
            otherLabel: 'Especifique otra actividad:',
          }
        ],
      },
    ],
  };
};
