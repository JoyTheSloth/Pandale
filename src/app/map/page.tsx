'use client';

import React from 'react';
import KolkataMetroExplorerModal from '@/components/KolkataMetroExplorerModal';

export default function MapPage() {
  return (
    <div className="w-full h-[calc(100dvh-4.5rem)] md:h-[calc(100dvh-5.5rem)] flex flex-col overflow-hidden">
      <KolkataMetroExplorerModal isPage={true} />
    </div>
  );
}
