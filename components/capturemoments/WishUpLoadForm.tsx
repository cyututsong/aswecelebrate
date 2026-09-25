'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { supabase, WishRow } from '@/lib/supabaseClient';

interface WishUploadFormProps {
  celebrantEmail: string;
  onWishSubmitted?: (newWish: WishRow) => void;
}

export default function WishUploadForm({ celebrantEmail, onWishSubmitted }: WishUploadFormProps) {
  // Modal visibility state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Form states
  const [guestName, setGuestName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let publicImageUrl: string | null = null;

      // 1. Upload Image to Supabase Storage Bucket
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('capture-moments')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('capture-moments')
          .getPublicUrl(filePath);

        publicImageUrl = urlData.publicUrl;
      }

      // 2. Insert object into 'wishes' table using 'as any' bypass
        const { data, error: dbError } = await (supabase.from('wishes') as any)
        .insert([
            {
            celebrant_email: celebrantEmail,
            guest_name: guestName,
            message: message,
            image_url: publicImageUrl,
            },
        ])
        .select();

      if (dbError) throw dbError;

      setSuccessMsg('Your wish and photo have been added to the gallery!');
      setGuestName('');
      setMessage('');
      setImageFile(null);
      setImagePreview(null);

      if (onWishSubmitted && data && data.length > 0) {
        onWishSubmitted(data[0] as WishRow);
      }

      // Automatically close modal after 1.5 seconds on success
      setTimeout(() => {
        handleClose();
      }, 1500);

    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An error occurred while sharing your wish.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING + ACTION BUTTON (CENTERED AT BOTTOM) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-full shadow-xl shadow-amber-500/40 flex items-center justify-center transition-all duration-300 focus:outline-none ring-4 ring-amber-500/20"
          aria-label="Add Wish"
        >
          <span className="text-3xl font-light leading-none mb-1">+</span>
        </button>
      </div>

      {/* SLIDE-UP MODAL OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-300"
          onClick={handleClose}
        >
          {/* SLIDE-UP CONTAINER */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto animate-slide-up"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800">
                Leave a Wish & Photo
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light focus:outline-none"
              >
                ✕
              </button>
            </div>

            <p className="text-xs md:text-sm text-gray-500 mb-6">
              Share a memorable photo and a warm message for the celebrant.
            </p>

            {successMsg && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs md:text-sm rounded-xl text-center">
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm rounded-xl text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah & Alex"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm bg-gray-50/50 text-black placeholder:text-gray-400 placeholder:opacity-100 mobile-input-fix"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Wish / Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your sweet note here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm bg-gray-50/50 resize-none text-black placeholder:text-gray-400 placeholder:opacity-100 mobile-input-fix"
                />
              </div>

              {/* Photo Upload & Preview */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Upload Photo
                </label>
                
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                    {imagePreview ? (
                      <div className="relative w-full h-full p-2 flex items-center justify-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-full object-contain rounded-lg"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                          Change
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-2xl mb-1">📸</span>
                        <p className="text-xs text-gray-500 font-medium">
                          Click to select a photo from your device
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 mt-2 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-medium text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sharing Wish...</span>
                  </>
                ) : (
                  'Post Your Wish 💌'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tailwind & Mobile Styling Keyframes */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Fixes iOS/Android WebKit input text overrides */
        .mobile-input-fix {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }
        .mobile-input-fix::placeholder {
          color: #9ca3af !important;
          -webkit-text-fill-color: #9ca3af !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}