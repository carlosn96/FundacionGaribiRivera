import { useState, useCallback } from 'react';
import { Emprendedor, EmprendedorFortalecimiento } from '../domain/models/Emprendedor';
import { EmprendedorAPI } from '../infrastructure/api/EmprendedorAPI';

export const useEmprendedores = () => {
  const [loading, setLoading] = useState(false);
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([]);
  const [enFortalecimiento, setEnFortalecimiento] = useState<EmprendedorFortalecimiento[]>([]);

  const fetchEmprendedores = useCallback(async () => {
    setLoading(true);
    try {
      const data = await EmprendedorAPI.getAll();
      setEmprendedores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching emprendedores:', error);
      setEmprendedores([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEnFortalecimiento = useCallback(async () => {
    setLoading(true);
    try {
      const data = await EmprendedorAPI.getEnFortalecimiento();
      setEnFortalecimiento(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching en fortalecimiento:', error);
      setEnFortalecimiento([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEmprendedor = async (id: number) => {
    try {
      await EmprendedorAPI.delete(id);
      setEmprendedores(prev => prev.filter(e => e.id !== id));
      setEnFortalecimiento(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting emprendedor:', error);
      throw error;
    }
  };

  return {
    loading,
    emprendedores,
    enFortalecimiento,
    fetchEmprendedores,
    fetchEnFortalecimiento,
    deleteEmprendedor,
  };
};
