import { BaseRepository } from "@/core/infrastructure/BaseRepository";
import { LineaBaseAdminResponse, LineaBaseAdminResponseSchema } from "../../domain/models/LineaBaseAdministracion";
import { ILineaBaseAdminRepository } from "../../domain/repositories/ILineaBaseAdminRepository";

class LineaBaseAdminRepository extends BaseRepository implements ILineaBaseAdminRepository {
  protected readonly prefix = "/admin/lineas-base";

  async getAdminData(): Promise<LineaBaseAdminResponse> {
    const data = await this.get<any>("/emprendedores");
    return LineaBaseAdminResponseSchema.parse(data);
  }

  async getDetail(idUsuario: number): Promise<any> {
    return this.get(`/emprendedores/${idUsuario}`);
  }

  async delete(idUsuario: number): Promise<void> {
    await this.remove(`/emprendedores/${idUsuario}`);
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
