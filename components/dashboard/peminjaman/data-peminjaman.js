'use client';

import { useEffect, useState } from 'react';

export default function PeminjamanDashboard() {
  const [peminjamanData, setPeminjamanData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPeminjaman = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/peminjaman');

        if (!response.ok) {
          throw new Error('Gagal memuat data peminjaman');
        }

        const data = await response.json();
        setPeminjamanData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeminjaman();
  }, []);

  const handleUpdateStatus = async (peminjamanId, status) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/peminjaman', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: peminjamanId,
          status,
          pustakawanId: 1, // Ganti dengan pustakawanId yang sesuai
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal memperbarui status peminjaman');
      }

      const updatedPeminjaman = await response.json();

      setPeminjamanData((prevData) =>
        prevData.map((item) =>
          item.id === peminjamanId ? { ...item, status: updatedPeminjaman.status } : item
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && peminjamanData.length === 0) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Daftar Peminjaman Buku</h2>

      {peminjamanData.length === 0 ? (
        <p>Tidak ada peminjaman yang tersedia.</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nama Siswa</th>
              <th className="px-4 py-2 border">Kelas</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">No. HP</th>
              <th className="px-4 py-2 border">Judul Buku</th>
              <th className="px-4 py-2 border">Tanggal Pinjam</th>
              <th className="px-4 py-2 border">Tanggal Kembali</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {peminjamanData.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.namaSiswa}</td>
                <td className="px-4 py-2 border">{item.kelas}</td>
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">{item.noHp}</td>
                <td className="px-4 py-2 border">{item.Buku?.judul || 'Tidak tersedia'}</td>
                <td className="px-4 py-2 border">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(item.tanggalKembali).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{item.status}</td>
                <td className="px-4 py-2 border">
                  {item.status === 'Menunggu_Persetujuan' ? (
                    <>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                        onClick={() => handleUpdateStatus(item.id, 'Disetujui')}
                      >
                        Setujui
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => handleUpdateStatus(item.id, 'Ditolak')}
                      >
                        Tolak
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
