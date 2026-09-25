'use client';

import React, { useState } from 'react';
import WishUploadForm from '@/components/capturemoments/WishUpLoadForm';
import CelebrantGallery from '@/components/capturemoments/CelebrantGallery';

export default function CallieCaptureMoments() {
  const celebrantEmail: string = 'jewelcallierae@gmail.com';
  const [refreshKey, setRefreshKey] = useState<number>(0);

  return (
    <main className="min-h-screen bg-white text-gray-900 w-full pt-10">


      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-3 text-gray-800">
        Share your Wishes
      </h2>
      <p className="text-center px-10 mb-5 text-lg md:text-lg">Take a selfie with Callie and share your special birthday wishes with her! 🧜‍♀️✨</p>

      <CelebrantGallery key={refreshKey} celebrantEmail={celebrantEmail} />

      <WishUploadForm
        celebrantEmail={celebrantEmail}
        onWishSubmitted={() => setRefreshKey((prev) => prev + 1)}
      />
    </main>
  );
}