import { http } from '@/core/http/ApiHttpClient';
import { EtapaFormacion } from '../../domain/models/Etapa';

export class EtapaAPI {
    // Etapas
    static async getAllEtapas() {
        return http.get<EtapaFormacion[]>('/admin/etapas');
    }

    static async getEtapaById(id: number) {
        return http.get<EtapaFormacion>(`/admin/etapas/${id}`);
    }

    static async createEtapa(data: Record<string, any>) {
        return http.post<EtapaFormacion>('/admin/etapas', data);
    }

    static async updateEtapa(id: number, data: Record<string, any>) {
        return http.post<EtapaFormacion>(`/admin/etapas/${id}`, data);
    }

    static async deleteEtapa(id: number) {
        return http.delete(`/admin/etapas/${id}`);
    }

    static async getEtapaCampos() {
        return http.get<any>('/admin/etapas/campos');
    }

    static async setEtapaActual(id: number) {
        return http.post(`/admin/etapas/${id}/actual`);
    }

    static async getEtapaActual() {
        return http.get<EtapaFormacion>('/admin/etapas/actual');
    }

    static async getEtapaCronograma(id: number) {
        return http.get<any[]>(`/admin/etapas/${id}/cronograma`);
    }
}