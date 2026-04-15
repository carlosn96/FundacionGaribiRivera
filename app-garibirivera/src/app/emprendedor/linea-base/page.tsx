/**
 * @fileoverview Línea Base - Página Principal
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useUser } from '@/modules/auth/context/UserContext';
import { useLineaBase } from '@/modules/emprendedor/linea-base/context/LineaBaseContext';
import { VisionGlassWindow, VisionTypography, VisionText, VisionSpringContainer } from '@/core/components/ui/vision-glass';

import { LineaBaseForm } from '@/modules/emprendedor/linea-base/components/LineaBaseForm';
import LineaBaseVistaPremium from '@/modules/emprendedor/linea-base/components/LineaBaseVistaPremium';

export default function LineaBasePage() {
  const { user } = useUser();
  const { lineaBaseResponse, isLoading, refreshLineaBase } = useLineaBase();
  const [showSuccess, setShowSuccess] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center spatial-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <VisionText variant="secondary">Cargando información...</VisionText>
        </div>
      </div>
    );
  }

  // Animation for success feedback
  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center spatial-bg p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <VisionGlassWindow className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </motion.div>
            </div>
            <div className="space-y-2">
              <VisionTypography variant="title-large" className="vision-text-primary">
                ¡Registro Exitoso!
              </VisionTypography>
              <VisionText variant="secondary">
                Tu información de Línea Base ha sido guardada correctamente.
              </VisionText>
            </div>
            <div className="flex justify-center pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
            <VisionText variant="tertiary" className="text-xs uppercase tracking-widest">
              Preparando tu perfil...
            </VisionText>
          </VisionGlassWindow>
        </motion.div>
      </div>
    );
  }

  // If we have data, show the view component
  if (lineaBaseResponse?.exists && lineaBaseResponse.lineaBase) {
    return (
      <div className="spatial-bg py-8 px-4 sm:px-6 lg:px-8">
        <LineaBaseVistaPremium
          initialData={lineaBaseResponse.lineaBase}
          showBackButton={false}
        />
      </div>
    );
  }

  // Otherwise show the form
  return (
    <div className="spatial-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 min-h-screen">
        {/* Header Section */}
        <VisionSpringContainer>
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-8">
            <div className="space-y-2">
              <VisionTypography variant="title-large" className="vision-text-primary">
                Línea Base Inicial
              </VisionTypography>
            </div>
            <VisionText variant="secondary" className="text-md leading-relaxed">
              Completa tu información para dar el primer paso en tu proceso con la Fundación.
            </VisionText>
          </div>
        </VisionSpringContainer>

        {/* Form Section */}
        <LineaBaseForm onSuccess={async () => {
          setShowSuccess(true);
          // Wait 3 seconds for the animation before refreshing
          setTimeout(async () => {
            await refreshLineaBase();
            setShowSuccess(false);
          }, 3500);
        }} />
      </div>
    </div>
  );
}
