'use client';

import { useEffect, useState } from 'react';

const DataPeminjaman = () => {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const pustakawanId = 1; // Ganti dengan ID pustakawan yang sedang login (gunakan autentikasi jika diperlukan)

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  const fetchPeminjaman = async () => {
    try {
      const res = await fetch('/api/peminjaman');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      if (!data) {
        throw new Error('Data kosong atau tidak valid');
      }
  
      setPeminjamanList(data);
    } catch (error) {
      console.error('Gagal mengambil data peminjaman:', error);
    }
  };  
  
  const handleApproval = async (id, isApproved) => {
    try {
      const res = await fetch('/api/approve', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved, pustakawanId }),
      });

      if (res.ok) {
        alert(isApproved ? 'Peminjaman disetujui!' : 'Peminjaman ditolak!');
        fetchPeminjaman();  // Refresh the list after action
      } else {
        alert('Terjadi kesalahan saat mengupdate peminjaman.');
      }
    } catch (error) {
      console.error('Gagal mengubah status peminjaman:', error);
      alert('Terjadi kesalahan saat mengubah status peminjaman.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <table className="w-full border-collapse border border-slate">
        <thead>
          <tr>
            <th className="border border-slate px-4 py-2">Nama Siswa</th>
            <th className="border border-slate px-4 py-2">Buku</th>
            <th className="border border-slate px-4 py-2">Status</th>
            <th className="border border-slate px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {peminjamanList.map((item) => (
            <tr key={item.id}>
              <td className="border border-slate px-4 py-2">{item.namaSiswa}</td>
              <td className="border border-slate px-4 py-2">{item.buku.judul}</td>
              <td className="border border-slate px-4 py-2">
                {item.isApproved ? 'Disetujui' : item.status === 'Ditolak' ? 'Ditolak' : 'Menunggu Persetujuan'}
              </td>
              <td className="border border-slate px-4 py-2">
                {!item.isApproved && item.status !== 'Ditolak' && (
                  <>
                    <button
                      onClick={() => handleApproval(item.id, true)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => handleApproval(item.id, false)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Tolak
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPeminjaman;
