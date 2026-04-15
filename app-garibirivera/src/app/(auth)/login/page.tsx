"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { useUser } from "@/modules/auth/context/UserContext";
import { getRedirectPath } from "@/modules/auth/domain/Roles";

export default function LoginPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || !user) return;
    router.replace(getRedirectPath(Number(user.tipo_usuario || 0)));
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden spatial-bg">
      <VisionSpringContainer className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-700">
        <LoginForm />
      </VisionSpringContainer>
    </div>
  );
}
