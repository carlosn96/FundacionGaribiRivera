"use client";

import React from 'react';
import { 
  VisionGlassWindow 
} from '@/core/components/ui/vision-glass';
import { 
  Users, 
  Search
} from 'lucide-react';
import { Input } from '@/core/components/ui/input';
import { Skeleton } from '@/core/components/ui/skeleton';
import type { User } from '@/modules/auth/domain/Auth';

interface UserListProps {
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: User[];
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
}

export function UserList({
  loading,
  searchTerm,
  setSearchTerm,
  filteredUsers,
  selectedUserId,
  setSelectedUserId
}: UserListProps) {
  return (
    <VisionGlassWindow className="w-[380px] flex-shrink-0 flex flex-col border-fundacion-amarillo/15 overflow-hidden shadow-xl">
      <div className="p-4 border-b border-fundacion-amarillo/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <Input 
            placeholder="Buscar usuario..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-fundacion-amarillo/5 border-transparent focus:border-fundacion-amarillo/30 h-11 rounded-vision-md"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-fundacion-amarillo/5">
        {loading ? (
          Array.from({length: 6}).map((_, i) => (
            <div key={i} className="p-4 flex gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center opacity-30 italic text-sm">No se encontraron usuarios</div>
        ) : (
          filteredUsers.map(user => (
            <button 
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`w-full text-left p-4 flex gap-3 transition-all hover:bg-fundacion-amarillo/5 ${selectedUserId === user.id ? 'bg-fundacion-amarillo/10 border-l-4 border-fundacion-verde' : 'border-l-4 border-transparent'}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full border border-fundacion-amarillo/20 overflow-hidden bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)]">
                  {user.fotografiaBase64 ? (
                    <img src={`data:image/jpeg;base64,${user.fotografiaBase64}`} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-6 h-6 opacity-30" />
                  )}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.estadoActivo ? 'bg-emerald-500' : 'bg-red-500'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold vision-text-primary text-sm truncate">{user.nombre} {user.apellidos}</div>
                <div className="text-xs vision-text-tertiary truncate">{user.correoElectronico}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </VisionGlassWindow>
  );
}

