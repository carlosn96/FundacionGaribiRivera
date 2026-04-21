/**
 * @fileoverview ALERTA DE DEPRECACION: Mock catalogs para Línea Base form.
 * @deprecated [FASE 2.5] Estos catálogos estáticos se están cargando en runtime.
 * Deberán removerse una vez se consolide la hidratación desde el backend en Fase 4.
 */

import {
  CantidadDependientesEconomicosData,
  IngresoMensualData,
  OcupacionActualData,
  MedioConocimientoData,
  TiempoCapacitacionData,
  RazonRecurreData,
  SolicitaCreditoData,
  UtilizaCreditoData,
  EstadoCivilData,
  EscolaridadData,
  GiroNegocioData,
  ActividadNegocioData,
  AntiguedadNegocioData,
  ComoEmpleaGananciasData,
  EstrategiasIncrementarVentasData,
  ObjetivosAhorroData,
  GeneroData
} from "@/modules/emprendedor/linea-base/domain/models/lineaBase";


// ============================================
// CATALOGS - PRELIMINAR SECTION
// ============================================

export const mediosConocimientoMock: MedioConocimientoData = {
  name: "medioConocimiento",
  tipo: "checkbox",
  data: [
    { id_medio: 1, descripcion: 'Redes sociales', icon: 'fas fa-hashtag' },
    { id_medio: 2, descripcion: 'Amigo o referencia', icon: 'fas fa-user-friends' },
    { id_medio: 3, descripcion: 'Evento o charla', icon: 'fas fa-microphone' },
    { id_medio: 4, descripcion: 'Prensa o radio', icon: 'fas fa-broadcast-tower' },
    { id_medio: 5, descripcion: 'Iglesia o comunidad', icon: 'fas fa-church' },
    { id_medio: 6, descripcion: 'Trabajador social', icon: 'fas fa-hands-helping' },
    { id_medio: 7, descripcion: 'Otro', icon: 'fas fa-ellipsis-h' },
  ]
};

export const razonRecurreFundacionMock: RazonRecurreData = {
  name: "razonRecurre",
  tipo: "radio",
  data: [
    { id_razon: 1, descripcion: 'Capacitación' },
    { id_razon: 2, descripcion: 'Crédito' },
  ]
};

export const solicitaCreditoMock: SolicitaCreditoData = {
  name: "solicitaCredito",
  tipo: "radio",
  data: [
    { id_solicitud: 1, descripcion: 'Crear tu negocio' },
  ]
};


// ============================================
// SECCION SOCIOECONOMICO PRELIMINAR
// ============================================

export const ocupacionesMock: OcupacionActualData = {
  name: 'ocupacionActual',
  tipo: "select",
  data: [
    { id_ocupacion: 1, descripcion: 'Empleado' },
    { id_ocupacion: 2, descripcion: 'Independiente' },
    { id_ocupacion: 3, descripcion: 'Estudiante' },
    { id_ocupacion: 4, descripcion: 'Ama de casa' },
    { id_ocupacion: 5, descripcion: 'Jubilado' }
  ],
};

export const rangosIngresoMensualMock: IngresoMensualData = {
  name: 'ingresoMensual',
  tipo: "select",
  data: [
    { id_rango: 1, descripcion: 'Menos de $5,000', medicion: 1 },
    { id_rango: 2, descripcion: '$5,000 - $10,000', medicion: 2 },
    { id_rango: 3, descripcion: '$10,000 - $20,000', medicion: 3 },
    { id_rango: 4, descripcion: '$20,000 - $50,000', medicion: 4 },
    { id_rango: 5, descripcion: 'Más de $50,000', medicion: 5 }
  ]
};

export const cantidadDependientesEconomicosMock: CantidadDependientesEconomicosData = {
  name: "cantidadDependientesEconomicos",
  tipo: "select",
  data: [
    { id_cantidad: 0, descripcion: "0" },
    { id_cantidad: 1, descripcion: "1" },
    { id_cantidad: 2, descripcion: "2" },
    { id_cantidad: 3, descripcion: "3" },
    { id_cantidad: 4, descripcion: "4 o más" }
  ]
};

export const utilizaCreditoMock: UtilizaCreditoData = {
  name: "utilizaCredito",
  tipo: "checkbox",
  data: [
    { id_utilidad: 1, descripcion: 'Mercancía' },
    { id_utilidad: 2, descripcion: 'Materia prima' },
    { id_utilidad: 3, descripcion: 'Mobiliario y equipo' },
  ]
};

export const tiempoDedicaFormacionMock: TiempoCapacitacionData = {
  name: "tiempoCapacitacion",
  tipo: "radio",
  data: [
    { id_tiempo: 1, descripcion: '1 a 2 horas' },
    { id_tiempo: 2, descripcion: '2 a 3 horas' },
    { id_tiempo: 3, descripcion: '4 a 5 horas' },
  ]
};

export const estadosCivilesMock: EstadoCivilData = {
  name: "estadoCivil",
  tipo: "select",
  data: [
    { id_estado_civil: 1, descripcion: 'Soltero' },
    { id_estado_civil: 2, descripcion: 'Casado' },
    { id_estado_civil: 3, descripcion: 'Divorciado' },
    { id_estado_civil: 4, descripcion: 'Viudo' },
    { id_estado_civil: 5, descripcion: 'Unión libre' },
  ]
};

export const escolaridadesMock: EscolaridadData = {
  name: "escolaridad",
  tipo: "select",
  data: [
    { id_escolaridad: 1, descripcion: 'Primaria' },
    { id_escolaridad: 2, descripcion: 'Secundaria' },
    { id_escolaridad: 3, descripcion: 'Preparatoria' },
    { id_escolaridad: 4, descripcion: 'Carrera técnica' },
    { id_escolaridad: 5, descripcion: 'Licenciatura' },
    { id_escolaridad: 6, descripcion: 'Posgrado' },
  ]
};

export const generoMock: GeneroData = {
  name: "genero",
  tipo: "radio",
  data: [
    { id_genero: 1, descripcion: 'Hombre' },
    { id_genero: 2, descripcion: 'Mujer' },
    { id_genero: 3, descripcion: 'Otro' },
  ]
};

export const giroNegocioMock: GiroNegocioData = {
  name: "giroNegocio",
  tipo: "select",
  data: [
    { id_tipo_giro: 1, descripcion: 'Comercio' },
    { id_tipo_giro: 2, descripcion: 'Servicios' },
    { id_tipo_giro: 3, descripcion: 'Manufactura' },
    { id_tipo_giro: 4, descripcion: 'Otro' },
  ]
};

export const actividadNegocioMock: ActividadNegocioData = {
  name: "actividadNegocio",
  tipo: "select",
  data: [
    { id_giro: 1, descripcion: 'Venta de productos' },
    { id_giro: 2, descripcion: 'Prestación de servicios' },
    { id_giro: 3, descripcion: 'Producción artesanal' },
    { id_giro: 4, descripcion: 'Otra' },
  ]
};

export const antiguedadNegocioMock: AntiguedadNegocioData = {
  name: "antiguedadNegocio",
  tipo: "select",
  data: [
    { id: 1, descripcion: 'Menos de 1 año' },
    { id: 2, descripcion: '1-2 años' },
    { id: 3, descripcion: '3-5 años' },
    { id: 4, descripcion: 'Más de 5 años' },
  ]
};

// ============================================
// SECCION ANALISIS NEGOCIO DETALLADO
// ============================================

export const estrategiasIncrementarVentasMock: EstrategiasIncrementarVentasData = {
  name: "estrategiasIncrementarVentas",
  tipo: "checkbox",
  data: [
    { id_estrategia: 1, descripcion: 'Marketing digital', icon: 'fas fa-chart-line' },
    { id_estrategia: 2, descripcion: 'Redes sociales', icon: 'fas fa-chart-line' },
    { id_estrategia: 3, descripcion: 'Publicidad tradicional', icon: 'fas fa-chart-line' },
    { id_estrategia: 4, descripcion: 'Mejora del producto/servicio', icon: 'fas fa-chart-line' },
  ]
};

export const comoEmpleaGananciasMock: ComoEmpleaGananciasData = {
  name: "comoEmpleaGanancias",
  tipo: "radio",
  data: [
    { id_empleo: 1, descripcion: 'Reinversión', icon: 'fas fa-money-bill-wave', medicion: 0 },
    { id_empleo: 2, descripcion: 'Ahorro personal', icon: 'fas fa-money-bill-wave', medicion: 0 },
    { id_empleo: 3, descripcion: 'Gastos personales', icon: 'fas fa-money-bill-wave', medicion: 0 },
    { id_empleo: 4, descripcion: 'Pago de deudas', icon: 'fas fa-money-bill-wave', medicion: 0 },
  ]
};

// ============================================
// SECCION ADMINISTRACION INGRESOS
// ============================================

export const objetivosAhorroMock: ObjetivosAhorroData = {
  name: "objetivosAhorro",
  tipo: "radio",
  data: [
    { id_objetivo: 1, descripcion: 'Emergencias', medicion: 0 },
    { id_objetivo: 2, descripcion: 'Inversión', medicion: 0 },
    { id_objetivo: 3, descripcion: 'Compra de activos', medicion: 0 },
    { id_objetivo: 4, descripcion: 'Educación', medicion: 0 },
  ]
};
