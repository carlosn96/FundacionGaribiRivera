export interface LineaBase {
  id: number;
  fechaRegistroFortalecimiento: string;
  identificacion: any;
  domicilio: any;
  socioeconomico: any;
  negocio: any;
  analisisNegocio: any;
  ingresosNegocio: any;
}

export interface VisitaSeguimiento {
  id: number;
  idLineaBase: number;
  fechaVisita: string;
  observaciones: string;
  fotografias: string[];
}
