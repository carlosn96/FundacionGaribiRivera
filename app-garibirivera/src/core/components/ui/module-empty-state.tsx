import { LucideIcon } from "lucide-react";
import { VisionTypography, VisionText } from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import React from "react";

interface ModuleEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick?: () => void; href?: string; icon?: LucideIcon; };
  gradient?: string;
  className?: string;
}

const ModuleEmptyState: React.FC<ModuleEmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  gradient,
  className = "",
}) => {
  return (
    <div className={`p-12 md:p-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-transparent ${className}`}>
        
        <div className="w-20 h-20 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center mb-5">
          <Icon className="w-10 h-10 text-zinc-400 dark:text-zinc-500" />
        </div>

        <div className="max-w-xl text-center mb-7">
          <VisionTypography variant="headline" as="h3" className="vision-text-primary text-xl font-bold mb-2 opacity-80">
            {title}
          </VisionTypography>
          <VisionText variant="secondary" className="text-sm leading-relaxed opacity-70 max-w-lg mx-auto">
            {description}
          </VisionText>
        </div>

        {action && (
          <div className="mt-1">
            {action.href ? (
              <Button variant="visionGlass" size="visionLg" className="gap-2 font-medium px-8 shadow-sm text-zinc-600 dark:text-zinc-300" asChild>
                <a href={action.href}>
                  {action.icon && <action.icon className="w-4 h-4" />}
                  {action.label}
                </a>
              </Button>
            ) : (
              <Button variant="visionGlass" size="visionLg" className="gap-2 font-medium px-8 shadow-sm text-zinc-600 dark:text-zinc-300" onClick={action.onClick}>        
                {action.icon && <action.icon className="w-4 h-4" />}
                {action.label}
              </Button>
            )}
          </div>
        )}
    </div>
  );
};

export default ModuleEmptyState;
