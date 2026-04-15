// src/core/components/step-form/types.ts

type FormDataMap = Record<string, unknown>;
type FieldValue = unknown;
type FieldOption = Record<string, unknown>;
type ValidationSchema = unknown;
type SetFieldValue = (field: string, value: FieldValue) => void;

// Base común para todos los campos
interface BaseField {
  name: string;
  label: string;
  required?: boolean;
  validation?: ValidationSchema; // Usar yup schema o similar
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  defaultValue?: FieldValue; // Valor por defecto (legacy, se mantiene por compatibilidad)
  hidden?: boolean;
  condition?: (data: FormDataMap) => boolean; // Función que determina si el campo es visible
  initialValue?: FieldValue; // Valor inicial del campo
  onChange?: (value: FieldValue, data: FormDataMap, setFieldValue: SetFieldValue) => void; // Función que se ejecuta al cambiar el valor
  allowOther?: boolean; // Permite opción "Otro" con campo adicional (solo para select, radio, checkbox)
  otherLabel?: string; // Label personalizado para el campo "Otro" (default: 'Especifique:' o 'Especifique otro:' según el tipo)
  maxLength?: number; // Longitud máxima para campos de texto
}

// Base para SubField (sin condition)
type SubFieldBase = Omit<BaseField, 'condition'>;

// Tipos específicos para SubField
interface SubTextField extends SubFieldBase {
  type: 'text';
}

interface SubTelField extends SubFieldBase {
  type: 'tel';
}

interface SubSelectField extends SubFieldBase {
  type: 'select';
  options?: FieldOption[]; // Para selects con id y value
  idKey?: string; // Clave para el id en options
  valueKey?: string; // Clave para el valor en options
  catalogId?: string; // Opcional, para cargar opciones dinámicamente
}

interface SubCheckboxField extends SubFieldBase {
  type: 'checkbox';
  options?: FieldOption[]; // Para checkboxes con id y value
  idKey?: string; // Clave para el id en options
  valueKey?: string; // Clave para el valor en options
  catalogId?: string; // Opcional, para cargar opciones dinámicamente
  isChecked?: FieldValue; // Valores iniciales marcados (prioridad sobre initialValue)
}

interface SubRadioField extends SubFieldBase {
  type: 'radio';
  options?: FieldOption[]; // Para radios con id y value
  idKey?: string; // Clave para el id en options
  valueKey?: string; // Clave para el valor en options
  catalogId?: string; // Opcional, para cargar opciones dinámicamente
  isSelected?: string | number; // Valor inicial seleccionado (prioridad sobre initialValue)
  // Propiedades para modo SI/NO condicional
  yesNoMode?: boolean; // Activa el modo SI/NO con campos condicionales
  yesOption?: string; // Etiqueta para opción "SI" (default: 'Sí')
  noOption?: string; // Etiqueta para opción "NO" (default: 'No')
  yesFields?: SubField[]; // Campos adicionales para cuando se elige "SI"
  noFields?: SubField[]; // Campos adicionales para cuando se elige "NO"
}

interface SubTextareaField extends SubFieldBase {
  type: 'textarea';
  rows?: number;
  cols?: number;
}

interface SubNumberField extends SubFieldBase {
  type: 'number';
  min?: number | string; // Valor mínimo permitido
  max?: number | string; // Valor máximo permitido
  step?: number; // Incremento/decremento (ej: 0.1, 1, 5, 10)
}

interface SubDateField extends SubFieldBase {
  type: 'date';
}

interface SubAutocompleteField extends SubFieldBase {
  type: 'autocomplete';
  searchEndpoint?: string; // Endpoint para búsquedas (opcional si se usa searchFunction)
  searchFunction?: (query: string) => Promise<{ value: string; label: string }[]>; // Función asíncrona para búsquedas
  resolveOptionByValue?: (value: string) => Promise<{ value: string; label: string } | null>; // Resolver etiqueta por ID/valor
  cacheKey?: string; // Clave para compartir cache entre autocompletes relacionados
  valueLabelField?: string; // Campo en data donde se guarda el label seleccionado
  debounceTime?: number; // Tiempo de debounce en ms (default: 300)
  minQueryLength?: number; // Longitud mínima de query para buscar (default: 1)
  searchPlaceholder?: string; // Placeholder para el input de búsqueda
  noResultsText?: string; // Texto cuando no hay resultados
  loadingText?: string; // Texto durante carga
  onSelect?: (selectedOption: { value: string; label: string; [key: string]: unknown }, setFieldValue: SetFieldValue) => void; // Función que se ejecuta al seleccionar una opción
  onClear?: (setFieldValue: SetFieldValue) => void; // Función que se ejecuta al borrar la selección
}

interface SubAlertField extends SubFieldBase {
  type: 'alert';
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'; // Tipo de alert
  title?: string; // Título del alert
  description?: string; // Descripción del alert
  icon?: string; // Nombre del icono (opcional)
}

// Unión para SubField
export type SubField = SubTextField | SubTelField | SubSelectField | SubCheckboxField | SubRadioField | SubTextareaField | SubNumberField | SubDateField | SubAutocompleteField | SubAlertField;

// Tipos específicos para cada tipo de campo
interface TextField extends BaseField {
  type: 'text';
}

interface TelField extends BaseField {
  type: 'tel';
}

interface SelectField extends BaseField {
  type: 'select';
  options?: FieldOption[]; // Para selects con id y value
  idKey?: string; // Clave para el id en options
  valueKey?: string; // Clave para el valor en options
  catalogId?: string; // Opcional, para cargar opciones dinámicamente
}

interface CheckboxField extends BaseField {
  type: 'checkbox';
  options?: FieldOption[]; // Para checkboxes con id y value
  idKey?: string; // Clave para el id en options
  valueKey?: string; // Clave para el valor en options
  catalogId?: string; // Opcional, para cargar opciones dinámicamente
  isChecked?: FieldValue; // Valores iniciales marcados (prioridad sobre initialValue)
}

interface RadioField extends BaseField {
  type: 'radio';
  options?: FieldOption[]; // Para radios con id y value
  idKey?: string; // Clave para el id en options
  valueKey?: string; // Clave para el valor en options
  catalogId?: string; // Opcional, para cargar opciones dinámicamente
  isSelected?: string | number; // Valor inicial seleccionado (prioridad sobre initialValue)
  // Propiedades para modo SI/NO condicional
  yesNoMode?: boolean; // Activa el modo SI/NO con campos condicionales
  yesOption?: string; // Etiqueta para opción "SI" (default: 'Sí')
  noOption?: string; // Etiqueta para opción "NO" (default: 'No')
  yesFields?: SubField[]; // Campos adicionales para cuando se elige "SI"
  noFields?: SubField[]; // Campos adicionales para cuando se elige "NO"
}

interface TextareaField extends BaseField {
  type: 'textarea';
  rows?: number; // Número de filas para el textarea
  cols?: number; // Número de columnas para el textarea
}

interface NumberField extends BaseField {
  type: 'number';
  min?: number | string; // Valor mínimo permitido
  max?: number | string; // Valor máximo permitido
  step?: number; // Incremento/decremento (ej: 0.1, 1, 5, 10)
}

interface DateField extends BaseField {
  type: 'date';
  min?: number | string; // Valor mínimo permitido
  max?: number | string; // Valor máximo permitido
}

interface AutocompleteField extends BaseField {
  type: 'autocomplete';
  searchEndpoint?: string; // Endpoint para búsquedas (opcional si se usa searchFunction)
  searchFunction?: (query: string) => Promise<{ value: string; label: string }[]>; // Función asíncrona para búsquedas
  resolveOptionByValue?: (value: string) => Promise<{ value: string; label: string } | null>; // Resolver etiqueta por ID/valor
  cacheKey?: string; // Clave para compartir cache entre autocompletes relacionados
  valueLabelField?: string; // Campo en data donde se guarda el label seleccionado
  debounceTime?: number; // Tiempo de debounce en ms (default: 300)
  minQueryLength?: number; // Longitud mínima de query para buscar (default: 1)
  searchPlaceholder?: string; // Placeholder para el input de búsqueda
  noResultsText?: string; // Texto cuando no hay resultados
  loadingText?: string; // Texto durante carga
  onSelect?: (selectedOption: { value: string; label: string; [key: string]: unknown }, setFieldValue: SetFieldValue) => void; // Función que se ejecuta al seleccionar una opción
  onClear?: (setFieldValue: SetFieldValue) => void; // Función que se ejecuta al borrar la selección
}

interface AlertField extends BaseField {
  type: 'alert';
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'; // Tipo de alert
  title?: string; // Título del alert
  description?: string; // Descripción del alert
  icon?: string; // Nombre del icono (opcional)
}

// Unión discriminada: El tipo final que reemplaza a Field
export type Field = TextField | TelField | SelectField | CheckboxField | RadioField | TextareaField | NumberField | DateField | AutocompleteField | AlertField;

// Tipo para valores SI/NO en modo condicional
export type YesNoValue = 'si' | 'no';

export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

export interface StepProps {
  config: StepConfig;
  data: FormDataMap;
  onDataChange: (field: string, value: FieldValue) => void;
  stepIndex: number;
  errors?: Record<string, string>;
}

export interface StepFormProps {
  steps: StepConfig[];
  onSubmit: (data: FormDataMap) => void;
  initialData?: FormDataMap;
}
