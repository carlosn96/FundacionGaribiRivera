"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/core/components/ui/dialog";
import { 
  ArrowRight,
  LucideIcon
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
  links: Array<{
    id: string;
    text: string;
    href: string;
    icon: LucideIcon;
  }>;
}

interface ModuleDetailModalProps {
  selectedModule: Module | null;
  onClose: () => void;
}

export function ModuleDetailModal({ selectedModule, onClose }: ModuleDetailModalProps) {
  return (
    <Dialog open={!!selectedModule} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl vision-glass-window border-[var(--border-brand)] p-0 overflow-hidden shadow-2xl bg-[var(--surface-base)]">
        {selectedModule && (
          <div className="flex flex-col">
            <div className={`p-8 bg-gradient-to-br ${selectedModule.gradient} relative overflow-hidden`}>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex items-center gap-6 text-white">
                <div className="w-16 h-16 rounded-[var(--vision-radius-medium)] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl border border-white/30 animate-in zoom-in duration-500">
                  <selectedModule.icon className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-bold tracking-tight">
                    {selectedModule.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/90 mt-1 text-sm font-medium max-w-md antialiased">
                    {selectedModule.desc}
                  </DialogDescription>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-[var(--surface-raised)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedModule.links.map((link) => (
                  <Link href={link.href} key={link.id} className="block group">
                    <div className="flex items-center gap-4 p-4 rounded-[var(--vision-radius-small)] border border-[var(--border-subtle)] bg-[var(--surface-base)] hover:bg-fundacion-verde hover:border-fundacion-verde transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="w-10 h-10 rounded-[8px] bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                         <link.icon className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-bold vision-text-primary group-hover:text-white text-sm transition-colors duration-300 truncate">
                          {link.text}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white/70" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="px-8 py-4 bg-[var(--interact-hover)] border-t border-[var(--border-subtle)] flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-disabled)]">
                Panel de {selectedModule.title}
              </span>
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-fundacion-amarillo/30" />)}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
