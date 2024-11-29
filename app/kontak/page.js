"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Kontak = () => {
  const router = useRouter();
  const backgrounds = ['bg-hero-1'];

  return (
    <div
      id="kontak"
      className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover bg-hero-1 overflow-x-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

      {/* Kontainer untuk Tombol Kembali dan Judul */}
      <div className="absolute z-10 flex items-center justify-between w-full top-16 left-10 right-10">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-white transition-colors hover:text-secondary"
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

        {/* Judul Halaman */}
        <h1 className="absolute text-5xl font-extrabold text-center text-white transform -translate-x-1/2 left-1/2">
          Hubungi Kami
        </h1>
      </div>

      {/* Kontainer Utama */}
      <div className="relative z-10 grid max-w-4xl gap-8 px-6 py-6 bg-white rounded-lg shadow-lg my-24 md:grid-cols-2 lg:my-32">
        {/* Informasi Kontak */}
        <div className="flex flex-col items-start justify-center space-y-10">
          {/* Alamat */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
              <i className="text-2xl text-green-600 ri-map-pin-2-line"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Alamat</h3>
              <p className="text-gray-600">Jl. Jalan Yuk, Kota Tasikmalaya</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
              <i className="text-2xl text-blue-600 ri-mail-send-line"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">E-mail</h3>
              <p className="text-gray-600">call.center@awokwik.com</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
              <i className="text-2xl text-green-500 ri-whatsapp-line"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
              <p className="text-gray-600">000-000-000</p>
            </div>
          </div>
        </div>

        {/* Formulir Kontak */}
        <div className="p-6 rounded-lg bg-gray-50">
          <h3 className="mb-6 text-2xl font-semibold text-center text-gray-800">
            Kirim Pesan
          </h3>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Nama"
              required
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Alamat E-mail"
              required
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <textarea
              name="message"
              placeholder="Ketik pesan"
              required
              className="w-full h-40 p-4 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white transition-all bg-primary rounded-lg hover:bg-secondary"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
