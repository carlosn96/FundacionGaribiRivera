import type { Metadata, Viewport } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/core/utils/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Fundación Garibi Rivera - Emprendedores",
    template: "%s | Fundación Garibi Rivera",
  },
  description: "Plataforma de gestión y seguimiento para emprendedores de la Fundación Garibi Rivera",
  icons: {
    icon: "/images/ico.png",
    shortcut: "/images/ico.png",
    apple: "/images/ico.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { UserProvider } from "@/modules/auth/context/UserContext";
import { ThemeProvider } from "@/core/context/ThemeContext";
import { Toaster } from "@/core/components/ui/sonner";
import { ConfirmProvider } from "@/core/context/ConfirmContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col font-sans antialiased spatial-bg",
          poppins.variable,
          workSans.variable
        )}
      >
        <ThemeProvider defaultTheme="light">
          <UserProvider>
            <ConfirmProvider>
              {children}
              <Toaster position="bottom-right" closeButton richColors />
            </ConfirmProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
