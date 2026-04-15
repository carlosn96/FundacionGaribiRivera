# Arquitectura del Módulo: Etapas de Formación (Difusión)

Este documento detalla la estructura y los principios de ingeniería aplicados en la modernización del módulo de Etapas. Sigue estas directrices para mantener la integridad del sistema.

## 1. Arquitectura de Capas (Screaming Architecture)

Organiza el código siguiendo una separación clara de responsabilidades para garantizar la mantenibilidad:

- **Dominio (`/domain/models`)**: Define interfaces puras como `EtapaFormacion`. No incluyas lógica de persistencia aquí; mantén el contrato de datos limpio y alineado con el backend.
- **Infraestructura (`/infrastructure/api`)**: Centraliza todas las peticiones HTTP en `EtapaAPI.ts`. Implementa métodos estáticos que encapsulen la comunicación con el servidor (Lumen) y abstraigan el uso de `axios` o `fetch`.
- **Hooks de Aplicación (`/hooks`)**: Utiliza `useEtapa.ts` para gestionar el estado complejo, la orquestación de llamadas a la API y la lógica de negocio del lado del cliente. Mantén este hook separado de otros dominios (como talleres o instructores).
- **Componentes de Interfaz (`/components/etapas`)**: Construye piezas atómicas y reutilizables. Delega la lógica de obtención de datos a los hooks y mantén los componentes enfocados en la presentación y la interacción del usuario.

## 2. Aplicación de Principios SOLID

Aplica estos principios para evitar el acoplamiento y facilitar el escalado:

- **Single Responsibility (SRP)**: Separa el listado (`EtapasList`), el ítem individual (`EtapaItem`), los filtros (`EtapasFilter`) y los modales (`EtapaFormModal`). Cada componente debe tener una única razón para cambiar.
- **Open/Closed (OCP)**: Extiende la funcionalidad a través de props y composición en lugar de modificar el código interno de los componentes existentes.
- **Interface Segregation (ISP)**: Define props específicas para cada componente. Por ejemplo, `EtapaItemProps` solo debe solicitar los datos y callbacks necesarios para renderizar una tarjeta.
- **Dependency Inversion (DIP)**: Haz que los componentes dependan de abstracciones (interfaces de dominio) y no de implementaciones concretas de la API.

## 3. Integración con el Backend (API & Mapping)

Garantiza la consistencia de datos entre Next.js y el API de Lumen:

- **Contrato de Datos**: Emplea `camelCase` en el frontend para alinearte con los estándares de JavaScript/TypeScript, basándote en la transformación realizada por `EtapaFormacionResource.php` en el servidor.
- **Mapeo Inverso**: Realiza la conversión de `camelCase` a `snake_case` (requerido por las validaciones de Laravel/Lumen) dentro del controlador del backend o de forma transparente en la capa de servicios del frontend, manteniendo los controladores de vista limpios.
- **Metadata Dinámica**: Consume endpoints de metadatos (como `/admin/etapas/campos`) para popular selectores (tipos de etapa, modalidades). Nunca dejes valores quemados (*hardcoded*) que dependan de la base de datos.

## 4. Estándar Visual (VisionGlass System)

Mantén la estética ejecutiva de alta gama en cada elemento visual:

- **Glassmorphism**: Aplica efectos de desenfoque (`backdrop-blur`), bordes sutiles con transparencias y sombras difusas para generar profundidad.
- **Jerarquía Visual**: Utiliza tipografía con `font-black` y `tracking-tight` para títulos principales. Reserva las Versalitas (`uppercase` con `tracking-widest`) para etiquetas de sistema y captions.
- **Estados Interactivos**: Implementa micro-interacciones (hover effects, transiciones suaves y estados de carga con Skeletons) que reaccionen a la actividad del usuario.
- **Acentuación de Estado**: Resalta visualmente la "Etapa Actual" mediante gradientes animados (`animate-pulse`) y auras de luz trasera para diferenciarla del histórico de etapas.

## 5. Flujo de Trabajo para Nuevas Funcionalidades

1. Define el contrato en `Etapa.ts`.
2. Implementa el endpoint en `EtapaAPI.ts`.
3. Expón la lógica en el hook `useTalleres.ts`.
4. Crea el componente UI siguiendo el sistema de diseño VisionGlass.
5. Integra en la página principal (`page.tsx`) mediante composición de componentes.
