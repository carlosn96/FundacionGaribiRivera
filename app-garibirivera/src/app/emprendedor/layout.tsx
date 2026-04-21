import React from 'react';
import EmprendedorLayout from '@/modules/emprendedor/components/EmprendedorLayout';
import { LineaBaseProvider } from '@/modules/emprendedor/linea-base/context/LineaBaseContext';
import AuthGuard from '@/modules/auth/components/AuthGuard';
import { ROLES } from '@/modules/auth/domain/policies/Roles';

export default function EmprendedorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={[ROLES.EMPRENDEDOR]}>
      <LineaBaseProvider>
        <EmprendedorLayout 
          title="Emprendedor"
          subtitle="Área de Emprendedor"
        >
          {children}
        </EmprendedorLayout>
      </LineaBaseProvider>
    </AuthGuard>
  );
}

