"use client";

import React from "react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden spatial-bg">
      <VisionSpringContainer className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-700">
        <RegisterForm />
      </VisionSpringContainer>
    </div>
  );
}
