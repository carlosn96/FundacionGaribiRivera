import { z } from "zod";
import { BaseRepository } from "@/core/infrastructure/BaseRepository";
import { LineaBaseAdminResponse, LineaBaseAdminResponseSchema } from "../../domain/models/LineaBaseAdministracion";
import { ILineaBaseAdminRepository } from "../../domain/repositories/ILineaBaseAdminRepository";
import { Emprendedor, EmprendedorSchema } from "../../domain/models/Emprendedor";

class LineaBaseAdminRepository extends BaseRepository implements ILineaBaseAdminRepository {
  protected readonly prefix = "/admin/lineas-base";

  async getEmprendedoresEtapaActual(): Promise<LineaBaseAdminResponse> {
    const url = `emprendedores/etapa-actual`;
    const data = await this.get<LineaBaseAdminResponse>(url);
    return LineaBaseAdminResponseSchema.parse(data);
  }

  async getEmprendedoresConLineaBasePorEtapa(idEtapa?: number): Promise<Emprendedor[]> {
    const url = `emprendedores/etapa/${idEtapa}`;
    const data = await this.get<Emprendedor[]>(url);
    return z.array(EmprendedorSchema).parse(data);
  }

  async getDetail(idUsuario: number): Promise<any> {
    return this.get(`/emprendedores/${idUsuario}`);
  }

  async delete(idLineaBase: number | undefined): Promise<void> {
    if (!idLineaBase) return;
    await this.remove(`/${idLineaBase}`);
  }

  async updateStage(idLineaBase: number, idEtapa: number): Promise<void> {
    await this.put("/actualizar-etapa", { idLineaBase, idEtapa });
  }

  async advanceFortalecimiento(idUsuario: number, idEtapa: number): Promise<void> {
    await this.post("/avanzar-fortalecimiento", { idUsuario, idEtapa });
  }

  async getCaseTracking(idLineaBase: number): Promise<any> {
    return this.get(`/seguimiento-caso/${idLineaBase}`);
  }

  async deleteCaseTracking(id: number): Promise<void> {
    await this.remove(`/seguimiento-caso/${id}`);
  }

  async deleteMultiple(ids: number[]): Promise<void> {
    await this.post("/eliminar-multiple", { ids });
  }
}

export const lineaBaseAdminRepository = new LineaBaseAdminRepository();
