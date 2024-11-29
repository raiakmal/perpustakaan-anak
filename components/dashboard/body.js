'use client';

import { useEffect, useState } from 'react';

const Body = () => {
  const [stats, setStats] = useState({
    bukuBaru: 0,
    bukuDipinjam: 0,
    bukuTersedia: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/statistik');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="font-semibold text-dark text-xl mt-1 mb-6 lg:text-2xl">
        Hello, selamat datang
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card
          title="Buku Baru Ditambahkan"
          count={stats.bukuBaru}
          desc="Buku baru ditambahkan di Perpustakaan"
          icon="ri-add-line"
        />
        <Card
          title="Buku Hilang"
          count={0}
          desc="Buku tidak ada di Perpustakaan"
          icon="ri-close-line"
        />
        <Card
          title="Buku Dipinjam"
          count={stats.bukuDipinjam}
          desc="Buku dipinjam"
          icon="ri-arrow-down-line"
        />
        <Card
          title="Buku Tersedia"
          count={stats.bukuTersedia}
          desc="Buku tersedia untuk dipinjam"
          icon="ri-check-line"
        />
      </div>
    </div>
  );
};

const Card = ({ title, count, desc, icon }) => (
  <div className="mb-12 relative max-w-sm">
    <div className="rounded-lg shadow-xl p-4 flex flex-col w-full h-full hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="font-semibold text-slate text-md mt-6 mb-3 lg:text-lg">
            {title}
          </h3>
          <p className="text-slate">{count} {desc}</p>
        </div>
        <div className="p-2">
          <i className={`${icon} text-3xl text-dark`}></i>
        </div>
      </div>
    </div>
  </div>
);

export default Body;