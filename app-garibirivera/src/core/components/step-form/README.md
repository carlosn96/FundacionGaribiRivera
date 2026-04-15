# StepForm & Step Components - Documentación Técnica

## 📋 Descripción General

El sistema StepForm es un conjunto de componentes React que implementa formularios multi-paso con validación en tiempo real, navegación intuitiva y diseño responsivo. Está compuesto por dos componentes principales: `StepForm` (contenedor) y `Step` (paso individual).

## 🏗️ Arquitectura

### Componentes Principales

1. **`StepForm`** - Contenedor principal que maneja navegación y estado global
2. **`Step`** - Componente individual que renderiza y valida cada paso

### Dependencias

- **React Hook Form** - Gestión de formularios y validación
- **Yup** - Esquemas de validación
- **Tailwind CSS** - Estilos y diseño responsivo
- **shadcn/ui** - Componentes de UI base

---

## 🎯 StepForm - Contenedor Principal

### Props

```typescript
interface StepFormProps {
  steps: StepConfig[];                    // Configuración de pasos
  onSubmit: (data: Record<string, any>) => void;  // Callback de envío
  initialData?: Record<string, any>;      // Datos iniciales
}
```

### Estado Interno

```typescript
const [currentStep, setCurrentStep] = useState(0);           // Paso actual (0-indexed)
const [formData, setFormData] = useState<Record<string, any>>(initialData); // Datos acumulados
const [stepValidations, setStepValidations] = useState<boolean[]>(); // Array de validaciones por paso
const [errors, setErrors] = useState<Record<string, Record<string, string>>>(); // Errores por paso
```

### Funciones de Navegación

#### `handleNext()`
- Verifica que el paso actual sea válido (`stepValidations[currentStep]`)
- Avanza al siguiente paso si es válido
- **Precondición**: Paso actual debe estar validado

#### `handlePrev()`
- Retrocede al paso anterior
- Siempre disponible (excepto en el primer paso)

#### `handleSubmit()`
- Verifica que TODOS los pasos estén validados (`stepValidations.every(v => v)`)
- Ejecuta el callback `onSubmit` con todos los datos acumulados
- **Precondición**: Todos los pasos deben estar validados

### Indicador de Progreso

#### Cálculo del Progreso
```typescript
const progress = ((currentStep + 1) / steps.length) * 100;
```

#### Estados Visuales
- **Completado**: Verde con ícono de check (✅)
- **Actual**: Azul con borde destacado (🔵)
- **Pendiente**: Gris con círculo vacío (⚪)

### Layout Responsivo

#### Desktop (≥640px)
- Layout horizontal: `[Anterior] ←espacio→ [Siguiente/Enviar]`
- Texto completo en botones
- Ancho mínimo para consistencia visual

#### Mobile (<640px)
- Layout apilado: Botones full-width en fila horizontal
- Texto abreviado para optimizar espacio
- Diseño touch-friendly

---

## 📝 Step - Componente Individual

### Props

```typescript
interface StepProps {
  config: StepConfig;                           // Configuración del paso
  data: Record<string, any>;                    // Datos globales del formulario
  onDataChange: (field: string, value: any) => void;        // Callback para cambios de datos
  onValidationChange: (stepIndex: number, isValid: boolean) => void; // Callback para validación
  errors: Record<string, string>;               // Errores externos
  stepIndex: number;                            // Índice del paso actual
}
```

### Validación Dinámica

#### Creación de Esquema Yup
```typescript
const createValidationSchema = (fields: Field[]) => {
  const schema: any = {};
  fields.forEach(field => {
    let validator: any;
    switch (field.type) {
      case 'text':
      case 'textarea': validator = yup.string(); break;
      case 'number': validator = yup.number(); break;
      case 'date': validator = yup.date(); break;
      case 'select':
      case 'radio': validator = yup.string(); break;
      case 'checkbox':
        validator = field.options?.length > 0
          ? yup.array().of(yup.number())
          : yup.boolean();
        break;
    }
    if (field.required) {
      validator = validator.required(`${field.label} es requerido`);
    }
    schema[field.name] = validator;
  });
  return yup.object().shape(schema);
};
```

### Integración React Hook Form

```typescript
const { control, handleSubmit, formState: { isValid }, watch, setValue } = useForm({
  resolver: yupResolver(schema),
  mode: 'onChange',        // Validación en tiempo real
  defaultValues: data,     // Valores iniciales desde props
});
```

### Comunicación Bidireccional

#### Hacia StepForm (Validación)
```typescript
useEffect(() => {
  if (prevIsValidRef.current !== isValid) {
    onValidationChange(stepIndex, isValid);
  }
}, [isValid, onValidationChange, stepIndex]);
```

#### Desde StepForm (Datos)
```typescript
useEffect(() => {
  const subscription = watch((value) => {
    Object.keys(value).forEach(key => {
      onDataChange(key, value[key]);
    });
  });
}, [watch, onDataChange]);
```

### Renderizado de Campos

#### Tipos de Campos Soportados

| Tipo | Componente | Validación | Descripción |
|------|------------|------------|-------------|
| `text` | `Input` | `yup.string()` | Campo de texto simple |
| `textarea` | `Textarea` | `yup.string()` | Área de texto multilínea |
| `number` | `Input` | `yup.number()` | Campo numérico |
| `date` | `Input` | `yup.date()` | Selector de fecha |
| `select` | `SelectGroup` | `yup.string()` | Dropdown con opciones |
| `checkbox` | `CheckboxGroup` / `Checkbox` | `yup.array()` / `yup.boolean()` | Grupo o individual |
| `radio` | `RadioGroupComponent` | `yup.string()` | Grupo de radio buttons |

#### Estructura de Campo
```tsx
<div className="space-y-2">
  <Label htmlFor={fieldId}>
    {field.label}
    {field.required && <span className="text-destructive">*</span>}
  </Label>
  <Controller
    name={field.name}
    control={control}
    render={({ field: controllerField }) => {
      // Renderizado específico por tipo
    }}
  />
  {error && <p className="text-destructive text-sm">{error}</p>}
</div>
```

---

## 🔗 Flujo de Datos

### 1. Inicialización
```
StepForm → Step[] → Campos renderizados con defaultValues
```

### 2. Interacción del Usuario
```
Usuario → Campo → React Hook Form → watch() → onDataChange() → StepForm.formData
```

### 3. Validación en Tiempo Real
```
Campo → yupResolver → isValid → onValidationChange() → StepForm.stepValidations[]
```

### 4. Navegación entre Pasos
```
Botón → handleNext/handlePrev → setCurrentStep → Re-render Step con nueva config
```

### 5. Envío Final
```
Botón Enviar → handleSubmit → onSubmit(formData) → Callback externo
```

---

## ⚙️ Características Técnicas

### Validación Robusta
- ✅ **Tiempo real** con `mode: 'onChange'`
- ✅ **Esquemas dinámicos** generados por configuración
- ✅ **Mensajes personalizados** por campo requerido
- ✅ **Prevención de navegación** si el paso no es válido

### Performance Optimizada
- ✅ **useCallback** para funciones de cambio de estado
- ✅ **useRef** para evitar loops infinitos de validación
- ✅ **Subscriptions limpias** en useEffect cleanup
- ✅ **Re-renders controlados** con dependencias específicas

### Accesibilidad (a11y)
- ✅ **Labels apropiados** con `htmlFor` y `id` únicos
- ✅ **Estados ARIA** implícitos en componentes shadcn/ui
- ✅ **Navegación por teclado** soportada
- ✅ **Contraste de colores** adecuado

### Extensibilidad
- ✅ **Campos personalizables** vía configuración JSON
- ✅ **Lógica custom** con `customLogic` callback
- ✅ **Validaciones extendidas** con esquemas Yup completos
- ✅ **Estilos modulares** con clases Tailwind

### Efectos Visuales Institucionales
- ✅ **Gradientes verdes** usando paleta primary/accent
- ✅ **Animaciones de fondo** con blur effects
- ✅ **Transiciones entre pasos** con fade/slide
- ✅ **Glassmorphism** con backdrop-blur
- ✅ **Sombras temáticas** con colores institucionales
### Accesibilidad Mejorada
- ✅ **Labels correctamente asociados** con `htmlFor` e `id`
- ✅ **Sin conflictos de eventos** (removido onClick duplicado)
- ✅ **Navegación por teclado** nativa
- ✅ **Estados ARIA** implícitos en componentes Radix
- ✅ **Aplicación correcta de propiedades opcionales** (`idKey`, `valueKey`, `defaultValue`, `hidden`)
- ✅ **Validación robusta** de propiedades opcionales con nullish coalescing
---

## 🎨 Experiencia de Usuario

### Indicador Visual de Progreso
- **Barra de progreso** con porcentaje calculado y animación
- **Estados visuales claros** para cada paso con gradientes institucionales
- **Nombres descriptivos** de pasos
- **Conexiones visuales** entre pasos con gradientes
- **Icono animado** (Sparkles) en el header
- **Fondos animados** con gradientes sutiles

### Navegación Intuitiva
- **Botones grandes** y accesibles (48px height)
- **Texto adaptativo** por breakpoint
- **Estados disabled** cuando no se puede proceder
- **Iconos direccionales** (ArrowLeft, ArrowRight, Send)
- **Animaciones de transición** entre pasos (300ms)

### Validación en Tiempo Real
- **Feedback inmediato** al usuario
- **Mensajes de error contextuales** por campo
- **Prevención de errores** antes del envío final
- **Estados visuales** de error (bordes rojos, mensajes)

### Diseño Responsivo
- **Layout adaptativo** móvil vs desktop
- **Botones touch-friendly** en móviles
- **Texto escalable** por tamaño de pantalla
- **Espaciado consistente** en todos los breakpoints

### Efectos Visuales Avanzados
- **Gradientes institucionales** (verde primary/accent)
- **Sombras dinámicas** con colores temáticos
- **Transiciones suaves** en todos los elementos
- **Fondos con blur** para efecto glassmorphism
- **Animaciones de entrada/salida** entre pasos

---

## 📊 Configuración de Ejemplo

### StepConfig Básico
```typescript
const stepConfig: StepConfig = {
  id: 'personal-info',
  title: 'Información Personal',
  description: 'Datos básicos del usuario',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre completo',
      type: 'text',
      required: true,
      placeholder: 'Ingresa tu nombre'
    },
    {
      name: 'email',
      label: 'Correo electrónico',
      type: 'text',
      required: true,
      placeholder: 'tu@email.com'
    },
    {
      name: 'pais',
      label: 'País de residencia',
      type: 'select',
      required: true,
      options: [
        { id: 'mx', nombre: 'México' },
        { id: 'co', nombre: 'Colombia' },
        { id: 'ar', nombre: 'Argentina' }
      ],
      idKey: 'id',
      valueKey: 'nombre'
    }
  ]
};
```

### Uso del StepForm
```tsx
const steps: StepConfig[] = [stepConfig1, stepConfig2, stepConfig3];

const handleSubmit = (data: Record<string, any>) => {
  console.log('Datos del formulario:', data);
  // Enviar a API, redireccionar, etc.
};

<StepForm
  steps={steps}
  onSubmit={handleSubmit}
  initialData={{ nombre: 'Juan Pérez' }}
/>
```

---
## 🔧 Aplicación de Propiedades en Fields

### Propiedades Opcionales del Field

Cada field en el arreglo `fields` puede tener las siguientes propiedades opcionales que se aplican automáticamente:

#### `idKey` y `valueKey` (para selects, radios, checkboxes con opciones)
```typescript
// Se valida si la propiedad está definida (no undefined) y se aplica correctamente
idKey={field.idKey ?? 'id'}        // Default: 'id' si no definido
valueKey={field.valueKey ?? 'value'} // Default: 'value' si no definido

// Ejemplo de uso:
const field = {
  name: 'pais',
  type: 'select', 
  options: [{ codigo: 'MX', texto: 'México' }], // Estructura personalizada
  idKey: 'codigo',    // Usará 'codigo' como key del id
  valueKey: 'texto'    // Usará 'texto' como key del valor
};
```

#### `defaultValue` (valor inicial del campo)
```typescript
// Se combina con los datos existentes, dando prioridad a los datos actuales
const getDefaultValues = () => {
  const defaults: Record<string, any> = {};
  config.fields.forEach(field => {
    if (field.defaultValue !== undefined) {
      defaults[field.name] = field.defaultValue; // Solo si está definido
    }
  });
  return { ...defaults, ...data }; // Datos existentes tienen prioridad
};
```

#### `condition` (visibilidad condicional basada en datos)
```typescript
// Función que determina si el campo debe mostrarse basado en los datos del formulario
condition: (data: Record<string, any>) => boolean

// Ejemplo: Campo visible solo cuando otro campo tiene un valor específico
{
  name: 'otroMedio',
  label: 'Especifique otro medio',
  type: 'text',
  required: true,
  condition: (data) => data.medioConocimiento === 'Otro'
}
```

#### `placeholder`, `disabled`, `required` (propiedades estándar)
```typescript
// Se aplican directamente en todos los tipos de campo soportados
<Input
  placeholder={field.placeholder}  // Texto de ayuda
  disabled={field.disabled}        // Campo deshabilitado
  required={field.required}        // Validación requerida
  // ... otras props
/>
```

### Validación de Propiedades Opcionales

- **`idKey`/`valueKey`**: Se usa `??` (nullish coalescing) para permitir strings vacías pero usar defaults si `undefined`
- **`defaultValue`**: Solo se aplica si está definido (`!== undefined`), permitiendo `null`, `0`, `false`, `""`
- **`hidden`**: Se evalúa como booleano, excluyendo completamente el campo del render (return null) pero manteniéndolo en validación y defaults
- **Otras propiedades**: Se pasan directamente si están definidas, usando defaults apropiados por tipo de campo

### Campos Condicionales

Los campos condicionales permiten mostrar u ocultar campos dinámicamente basado en los valores de otros campos en el formulario. Esta funcionalidad es útil para crear formularios adaptativos que se ajustan a las respuestas del usuario.

#### Implementación

```typescript
{
  name: 'medioConocimiento',
  label: '¿Cómo se enteró de la fundación?',
  type: 'select',
  required: true,
  options: [
    { id: 1, descripcion: 'Redes sociales' },
    { id: 2, descripcion: 'Sitio web' },
    { id: 3, descripcion: 'Otro' }
  ],
  idKey: 'id',
  valueKey: 'descripcion'
},
{
  name: 'otroMedio',
  label: 'Especifique otro medio',
  type: 'text',
  required: true,
  // Campo condicional: solo visible cuando se selecciona "Otro"
  condition: (data) => data.medioConocimiento === 'Otro'
}
```

#### Comportamiento

- **Visibilidad**: Los campos condicionales solo se renderizan cuando su condición devuelve `true`
- **Validación**: Los campos ocultos por condición se excluyen automáticamente de la validación
- **Datos**: Los valores de campos condicionales se incluyen en `formData` cuando son visibles
- **Tiempo real**: Las condiciones se evalúan automáticamente cuando cambian los datos del formulario

#### Ejemplos de Condiciones

```typescript
// Condición simple - igualdad
condition: (data) => data.campoSelect === 'valorEspecifico'

// Condición compuesta - AND lógico
condition: (data) => data.campo1 === 'valor1' && data.campo2 === 'valor2'

// Condición con opciones de select
condition: (data) => {
  const opciones = [
    { id: 1, descripcion: 'Opción A' },
    { id: 2, descripcion: 'Opción B' }
  ];
  const seleccionada = opciones.find(opt => opt.descripcion === data.campoSelect);
  return seleccionada?.id === 2;
}

// Condición numérica
condition: (data) => data.edad >= 18

// Condición con array (checkbox múltiple)
condition: (data) => data.intereses?.includes('tecnologia')
```

#### Demo Interactiva

Para probar los campos condicionales, puedes usar el componente `ConditionalFieldsDemo`:

```tsx
import ConditionalFieldsDemo from './examples/ConditionalFieldsDemo';

// En tu aplicación
<ConditionalFieldsDemo />
```

Este demo incluye varios ejemplos de campos condicionales que se activan basado en diferentes tipos de condiciones.

#### Ventajas sobre `hidden`

- **Reactividad**: Se actualizan automáticamente sin necesidad de modificar la configuración
- **Limpieza**: No requieren estado adicional en el componente padre
- **Mantenibilidad**: La lógica condicional está junto con la definición del campo
- **Validación automática**: Se excluyen de la validación cuando no son visibles

---
## � Mejoras Recientes (v2.0)

### ✨ Nuevas Características Visuales
- **Indicador de progreso mejorado** con icono Sparkles y gradientes animados
- **Fondos animados** con gradientes institucionales y blur effects
- **Transiciones entre pasos** con animaciones de fade y slide
- **Gradientes temáticos** usando colores primary/accent de la institución
- **Efectos glassmorphism** con backdrop-blur en cards
- **Sombras dinámicas** que responden al estado de los pasos

### 🎨 Adaptación a Paleta Institucional
- **Colores primary/accent** integrados en gradientes y efectos
- **Transparencias temáticas** para mantener consistencia visual
- **Estados hover/focus** usando colores institucionales
- **Animaciones sutiles** que complementan la identidad visual

### 📱 Experiencia Mejorada
- **Animaciones de navegación** entre pasos (300ms)
- **Estados de carga** visuales durante transiciones
- **Feedback visual inmediato** en interacciones
- **Responsive design** optimizado para touch devices

### 🔧 Mejoras Técnicas
- **Estado de animación** (`isAnimating`) para transiciones suaves
- **Gradientes CSS** dinámicos basados en estado
- **Transiciones CSS** optimizadas con GPU acceleration
- **Efectos de profundidad** con sombras temáticas

### Limitaciones Actuales
- No soporta subida de archivos directamente
- Validación limitada a tipos Yup básicos
- No incluye persistencia automática de datos

### Posibles Extensiones
- **File Upload**: Campo tipo `file` con drag & drop
- **Validación Avanzada**: Regex, dependencias entre campos
- **Persistencia**: LocalStorage, IndexedDB
- **Analytics**: Tracking de pasos y tiempo
- **Themes**: Soporte para temas oscuros/claros

### Mejores Prácticas
1. **Configuración externa**: Mantener configs en archivos separados
2. **Validación server-side**: Siempre validar en backend
3. **Testing**: Probar navegación y validación exhaustivamente
4. **Performance**: Limitar campos por paso (máx 10-15)
5. **Accesibilidad**: Probar con screen readers

---

## 📈 Casos de Uso

- **Formularios de registro** multi-paso
- **Encuestas complejas** con lógica condicional
- **Configuraciones de producto** guiadas
- **Formularios de admisión** institucionales
- **Procesos de onboarding** de usuarios

Este sistema proporciona una base sólida y extensible para formularios multi-paso en aplicaciones React modernas.