import { Metadata } from "next";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { ForgotPasswordForm } from "@/modules/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Recuperar Contraseña | Fundación Garibi Rivera",
  description: "Recupera el acceso a tu cuenta de la Fundación Garibi Rivera.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden spatial-bg">
      <VisionSpringContainer className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-700">
        <ForgotPasswordForm />
      </VisionSpringContainer>
    </div>
  );
}
