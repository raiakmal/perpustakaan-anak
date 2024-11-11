'use client';

import Sidebar from '@/components/dashboard/sidebar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [buku, setBuku] = useState([]);

  useEffect(() => {
    fetch('/api/buku')
      .then((res) => res.json())
      .then((data) => setBuku(data));
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard */}
      <div className="w-full p-8">
        <h1>Daftar Buku</h1>
        <ul>
          {buku.map((b) => (
            <li key={b.id}>
              {b.judul} - {b.penulis}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
