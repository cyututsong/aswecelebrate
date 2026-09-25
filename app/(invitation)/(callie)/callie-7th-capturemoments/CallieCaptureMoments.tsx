'use client';

import React, { useState } from 'react';
import WishUploadForm from '@/components/capturemoments/WishUpLoadForm';
import CelebrantGallery from '@/components/capturemoments/CelebrantGallery';

export default function CallieCaptureMoments() {
  const celebrantEmail: string = 'jewelcallierae@gmail.com';
  const [refreshKey, setRefreshKey] = useState<number>(0);

  return (
    <main className="min-h-screen bg-white text-gray-900 w-full">
      <CelebrantGallery key={refreshKey} celebrantEmail={celebrantEmail} />

      <WishUploadForm
        celebrantEmail={celebrantEmail}
        onWishSubmitted={() => setRefreshKey((prev) => prev + 1)}
      />
    </main>
  );
}