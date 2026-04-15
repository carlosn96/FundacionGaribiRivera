// src/components/stepForm/examples/field-properties-example.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

import { StepConfig } from '../types';

/**
 * Ejemplo que demuestra cómo se aplican correctamente todas las propiedades opcionales
 * en cada field del arreglo de fields, incluyendo la nueva propiedad allowOther
 */
export const fieldPropertiesExample: StepConfig = {
  id: 'field-properties-demo',
  title: 'Demostración de Propiedades Opcionales',
  description: 'Ejemplo completo de cómo se aplican todas las propiedades opcionales de los fields',
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // SELECT: Con idKey, valueKey personalizados y allowOther
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'categoria',
      label: 'Categoría (con keys personalizados y "Otro")',
      type: 'select',
      required: true,
      options: [
        { id_cat: 'tech', nombre_cat: 'Tecnología' },
        { id_cat: 'edu', nombre_cat: 'Educación' },
        { id_cat: 'art', nombre_cat: 'Arte' },
        { id_cat: 0, nombre_cat: 'Otro' }
      ],
      idKey: 'id_cat',           // Se aplica correctamente (no undefined)
      valueKey: 'nombre_cat',    // Se aplica correctamente (no undefined)
      placeholder: 'Selecciona una categoría...',
      allowOther: true           // Habilita campo adicional cuando se selecciona "Otro"
    },

    // ═══════════════════════════════════════════════════════════════════
    // SELECT: Con keys por defecto (id, value)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'pais',
      label: 'País (con keys por defecto)',
      type: 'select',
      required: true,
      options: [
        { id: 'mx', value: 'México' },
        { id: 'co', value: 'Colombia' },
        { id: 'ar', value: 'Argentina' }
      ],
      // idKey y valueKey no definidos → usarán 'id' y 'value' por defecto
      placeholder: 'Selecciona un país...'
    },

    // ═══════════════════════════════════════════════════════════════════
    // NUMBER: Con min, max, step y defaultValue
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'edad',
      label: 'Edad (con rango y valor por defecto)',
      type: 'number',
      required: true,
      defaultValue: 25,  // Se aplicará si no hay valor en data
      min: 18,           // Edad mínima permitida
      max: 100,          // Edad máxima permitida
      step: 1,           // Incremento de 1 en 1
      placeholder: 'Ingresa tu edad'
    },

    // ═══════════════════════════════════════════════════════════════════
    // NUMBER: Con initialValue (prioridad sobre defaultValue)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'experiencia_anios',
      label: 'Años de experiencia',
      type: 'number',
      required: true,
      initialValue: 0,   // Valor inicial (tiene prioridad sobre defaultValue)
      defaultValue: 5,   // Este NO se usará porque initialValue tiene prioridad
      min: 0,
      max: 50,
      step: 1,
      placeholder: 'Años de experiencia profesional'
    },

    // ═══════════════════════════════════════════════════════════════════
    // NUMBER: Con step decimal para precios/montos
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'salario_esperado',
      label: 'Salario esperado (miles de pesos)',
      type: 'number',
      required: false,
      min: 0,
      max: 1000,
      step: 0.5,         // Permite valores como 15.5, 20.0, etc.
      placeholder: 'Ej: 25.5'
    },

    // ═══════════════════════════════════════════════════════════════════
    // TEXT: Campo oculto (no se renderizará)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'campo_oculto',
      label: 'Campo Oculto',
      type: 'text',
      hidden: true,  // Este campo no aparecerá en el formulario
      defaultValue: 'valor_oculto'
    },

    // ═══════════════════════════════════════════════════════════════════
    // TEXT: Campo deshabilitado
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'codigo_postal',
      label: 'Código Postal (deshabilitado)',
      type: 'text',
      disabled: true,  // Campo no editable
      defaultValue: '12345'
    },

    // ═══════════════════════════════════════════════════════════════════
    // CHECKBOX MÚLTIPLE: Con keys personalizados y allowOther
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'intereses',
      label: 'Intereses (checkbox múltiple con "Otro")',
      type: 'checkbox',
      required: true,
      options: [
        { id_interes: 1, nombre_interes: 'Programación' },
        { id_interes: 2, nombre_interes: 'Diseño' },
        { id_interes: 3, nombre_interes: 'Marketing' },
        { id_interes: 4, nombre_interes: 'Finanzas' },
        { id_interes: 0, nombre_interes: 'Otro' }
      ],
      idKey: 'id_interes',       // Se valida y aplica correctamente
      valueKey: 'nombre_interes', // Se valida y aplica correctamente
      defaultValue: [1],          // Valor inicial: "Programación" seleccionado
      allowOther: true            // Habilita campo adicional cuando se marca "Otro"
    },

    // ═══════════════════════════════════════════════════════════════════
    // RADIO: Con keys por defecto y allowOther
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'genero',
      label: 'Género (radio con "Otro")',
      type: 'radio',
      required: true,
      options: [
        { id: 'M', value: 'Masculino' },
        { id: 'F', value: 'Femenino' },
        { id: 'NB', value: 'No binario' },
        { id: 'O', value: 'Otro' }
      ],
      // Usará defaults 'id' y 'value'
      defaultValue: 'M',
      allowOther: true  // Habilita campo adicional cuando se selecciona "Otro"
    },

    // ═══════════════════════════════════════════════════════════════════
    // TEXTAREA: Con placeholder y required
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'comentarios',
      label: 'Comentarios adicionales',
      type: 'textarea',
      required: false,
      placeholder: 'Comparte tus comentarios o sugerencias...'
    },

    // ═══════════════════════════════════════════════════════════════════
    // DATE: Con validación requerida y rango de fechas
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'fecha_nacimiento',
      label: 'Fecha de nacimiento',
      type: 'date',
      required: true,
      min: '1924-01-01',  // Fecha mínima permitida
      max: '2006-12-31',  // Fecha máxima permitida (18 años atrás)
    },

    // ═══════════════════════════════════════════════════════════════════
    // CHECKBOX SIMPLE: Sin opciones (true/false)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'acepta_terminos',
      label: 'Acepto los términos y condiciones',
      type: 'checkbox',
      required: true,
      defaultValue: false
    },

    // ═══════════════════════════════════════════════════════════════════
    // SELECT: Con condition (campo condicional)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'nivel_experiencia',
      label: '¿Cuál es tu nivel de experiencia en programación?',
      type: 'select',
      required: true,
      options: [
        { id: 'principiante', value: 'Principiante' },
        { id: 'intermedio', value: 'Intermedio' },
        { id: 'avanzado', value: 'Avanzado' }
      ],
      placeholder: 'Selecciona tu nivel...',
      condition: (formData) => {
        // Este campo solo aparece si "Programación" está seleccionado en intereses
        const intereses = formData['intereses'];
        return Array.isArray(intereses) && intereses.includes(1);
      }
    }
  ]
};

/**
 * Función helper para demostrar la validación de propiedades opcionales
 */
export const validateFieldProperties = (field: any) => {
  const validations = {
    idKey: field.idKey ?? 'id',        // Nullish coalescing: permite '' pero usa 'id' si undefined
    valueKey: field.valueKey ?? 'value', // Nullish coalescing: permite '' pero usa 'value' si undefined
    defaultValue: field.defaultValue !== undefined ? field.defaultValue : null, // Solo si definido
    hidden: !!field.hidden,            // Conversión a booleano
    disabled: !!field.disabled,        // Conversión a booleano
    required: !!field.required,        // Conversión a booleano
    placeholder: field.placeholder || '', // String vacío si no definido
    allowOther: !!field.allowOther,    // Conversión a booleano (nueva propiedad)
    condition: typeof field.condition === 'function' ? field.condition : null // Función o null
  };

  return validations;
};

/**
 * Ejemplo de datos que generaría este formulario al completarse
 */
export const exampleFormData = {
  // Select con "Otro"
  categoria: '0',  // ID de "Otro"
  categoria_other: 'Ciencias de la Salud',  // Campo adicional

  // Select normal
  pais: 'mx',

  // Number con rango
  edad: 28,

  // Number con initialValue
  experiencia_anios: 0,  // Se inicializa con 0 automáticamente

  // Number con step decimal
  salario_esperado: 25.5,

  // Campo oculto
  campo_oculto: 'valor_oculto',

  // Campo deshabilitado
  codigo_postal: '12345',

  // Checkbox múltiple con "Otro"
  intereses: [1, 2, 0],  // Programación, Diseño, Otro
  intereses_other: 'Inteligencia Artificial y Machine Learning',  // Campo adicional

  // Radio con "Otro"
  genero: 'O',  // "Otro"
  genero_other: 'Prefiero no especificar',  // Campo adicional

  // Textarea
  comentarios: 'Me gustaría aprender más sobre desarrollo web moderno.',

  // Date con rango
  fecha_nacimiento: '1995-06-15',

  // Checkbox simple
  acepta_terminos: true,

  // Campo condicional (solo aparece si "Programación" está en intereses)
  nivel_experiencia: 'intermedio'
};

/**
 * Validación de comportamiento de "Otro"
 */
export const otherFieldBehavior = {
  select: {
    description: 'Cuando se selecciona la opción "Otro", aparece un input de texto debajo',
    dataStructure: {
      fieldName: 'id_de_la_opcion_otro',
      fieldName_other: 'texto_personalizado'
    },
    validation: 'Si "Otro" está seleccionado, el campo _other es obligatorio'
  },
  
  radio: {
    description: 'Similar a select, aparece input cuando se selecciona "Otro"',
    dataStructure: {
      fieldName: 'id_de_la_opcion_otro',
      fieldName_other: 'texto_personalizado'
    },
    validation: 'Si "Otro" está seleccionado, el campo _other es obligatorio'
  },
  
  checkbox: {
    description: 'Cuando se marca la casilla "Otro", aparece un input de texto',
    dataStructure: {
      fieldName: [1, 2, 0],  // Array de IDs, 0 = Otro
      fieldName_other: 'texto_personalizado'
    },
    validation: 'Si "Otro" está en el array, el campo _other es obligatorio',
    autoCleanup: 'Al desmarcar "Otro", el campo _other se limpia automáticamente'
  }
};
