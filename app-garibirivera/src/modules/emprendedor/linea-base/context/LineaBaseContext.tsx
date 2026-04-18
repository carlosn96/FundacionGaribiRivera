'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useUser } from '@/modules/auth/context/UserContext';
import { ROLES } from '@/modules/auth/domain/Roles';
import { verificarExisteLineaBase } from '@/modules/emprendedor/linea-base/application/services/lineaBase';
import { LineaBaseDataExistsResponse } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBaseSections';

interface LineaBaseContextType {
  lineaBaseResponse: LineaBaseDataExistsResponse;
  isLoading: boolean;
  refreshLineaBase: () => Promise<void>;
}

const LineaBaseContext = createContext<LineaBaseContextType | undefined>(undefined);

const EMPTY_LINEA_BASE: LineaBaseDataExistsResponse = {
  ok: true,
  success: true,
  exists: false,
  lineaBase: null,
  message: '',
};

export const LineaBaseProvider = ({ children }: { children: ReactNode }) => {
  const [lineaBaseResponse, setLineaBaseResponse] = useState<LineaBaseDataExistsResponse>(EMPTY_LINEA_BASE);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const fetchStatus = useCallback(async () => {
    if (user?.tipoUsuario === ROLES.EMPRENDEDOR) {
      setIsLoading(true);
      try {
        const response = await verificarExisteLineaBase();
        setLineaBaseResponse(response);
      } catch (error) {
        console.warn('Error fetching linea base status:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return (
    <LineaBaseContext.Provider value={{ 
      lineaBaseResponse, 
      isLoading, 
      refreshLineaBase: fetchStatus 
    }}>
      {children}
    </LineaBaseContext.Provider>
  );
};

export const useLineaBase = () => {
  const context = useContext(LineaBaseContext);
  if (context === undefined) {
    throw new Error('useLineaBase debe usarse dentro de un LineaBaseProvider (solo emprendedores)');
  }
  return context;
};

