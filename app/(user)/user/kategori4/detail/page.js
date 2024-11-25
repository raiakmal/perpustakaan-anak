"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Detail = () => {
  const router = useRouter();

  const [borrowerName, setBorrowerName] = useState("");
  const [address, setAddress] = useState("");
  const [borrowDate, setBorrowDate] = useState("");  // State untuk tanggal peminjaman
  const [returnDate, setReturnDate] = useState("");  // State untuk tanggal pengembalian

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="absolute top-8 left-8">
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
      </div>

      {/* Judul Pinjam Buku */}
      <div className="absolute text-center transform -translate-x-1/2 top-20 left-1/2">
        <h1 className="text-3xl font-bold">Pinjam Buku</h1>
      </div>

      <div className="w-[1100px] bg-white rounded-lg shadow-lg flex mt-1">
        {/* Bagian Kiri */}
        <div className="w-1/2 p-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <img
              src="/path-to-image.jpg"
              alt="Produk"
              className="w-full h-[250px] object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">Nama Produk</h2>
            <p className="text-sm">Penulis: Nama Penulis</p>
            <p className="text-sm">Stok: 0</p>
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="w-1/2 p-8">
          <div className="space-y-6">
            {/* Judul Buku */}
            <div className="flex items-center">
              <h3 className="w-full text-xl font-semibold text-gray-800">Nama Buku</h3>
            </div>

            {/* Input Nama Peminjam */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium" htmlFor="borrowerName">
                Nama Peminjam
              </label>
              <input
                id="borrowerName"
                type="text"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                placeholder="Masukkan nama peminjam"
                className="w-2/3 h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input Alamat */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium" htmlFor="address">
                Alamat
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan alamat"
                className="w-2/3 h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Tanggal Peminjaman */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium" htmlFor="borrowDate">
                Tanggal Peminjaman
              </label>
              <input
                id="borrowDate"
                type="date"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}  // Menyimpan tanggal peminjaman
                className="w-2/3 h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Tanggal Pengembalian */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium" htmlFor="returnDate">
                Tanggal Pengembalian
              </label>
              <input
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}  // Menyimpan tanggal pengembalian
                className="w-2/3 h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Tombol Pinjam */}
          <button
            onClick={() => {
              if (borrowerName && address && borrowDate && returnDate) {
                console.log("Navigating to /kategori1/detail");
                router.push("/kategori1/detail");
              } else {
                alert("Harap isi semua informasi yang diperlukan!");
              }
            }}
            className="px-6 py-3 mt-8 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Pinjam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
