export interface LineaBase {
  id: number;
  id_emprendedor: number;
  fecha_registro: string;
  identificacion: any;
  domicilio: any;
  socioeconomico: any;
  negocio: any;
  analisis_negocio: any;
  ingresos_negocio: any;
}

export interface VisitaSeguimiento {
  id: number;
  id_linea_base: number;
  fecha_visita: string;
  observaciones: string;
  fotografias: string[];
}
