export type CatalogItem = {
  id?: number;
  id_rubro?: number;
  id_catalogo_estado_civil?: number;
  descripcion?: string;
  nombre?: string;
};

export type CatalogEntry = {
  data: CatalogItem[];
};

export type CatalogMap = Record<string, CatalogEntry | unknown>;
