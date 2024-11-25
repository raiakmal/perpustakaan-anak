"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Kategori3 = () => {
  const router = useRouter();

  return (
    <div className="relative px-4 lg:px-0">
      <button
        onClick={() => router.back()}
        className="absolute flex items-center text-black transition-colors top-10 left-20 hover:text-green-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-base font-medium">Kembali</span>
      </button>

      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-green-800">KATEGORI 3</h2>
          <div className="relative grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(32)].map((_, index) => (
              <div
                key={index}
                className="p-4 transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105"
              >
                <div className="w-full h-48 mb-4 bg-gray-200"></div>
                <p className="mb-1 text-lg font-medium text-gray-700">Lorem ipsum dolor</p>
                <p className="mb-1 text-sm text-gray-700">Lorem ipsum dolor</p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">stok: 0</p>
                  <button 
                    onClick={() => router.push('/user/kategori3/detail')} 
                    className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Pinjam
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kategori3;
