'use client';

import React from 'react';
import KolkataMetroExplorerModal from '@/components/KolkataMetroExplorerModal';

export default function MapPage() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-3 px-2 sm:px-6 flex flex-col items-center">
      <KolkataMetroExplorerModal isPage={true} />
    </div>
  );
}
