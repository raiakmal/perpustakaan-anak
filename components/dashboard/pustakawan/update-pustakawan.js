'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function UpdatePustakawan() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pustakawanId = searchParams.get('id');

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noHp: '',
  });
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  useEffect(() => {
    if (!pustakawanId) {
      setPesanError('ID Pustakawan tidak tersedia');
      return;
    }

    const fetchPustakawan = async () => {
      try {
        const response = await fetch(`/api/update-pustakawan/${pustakawanId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Gagal memuat data pustakawan');
        }
        const data = await response.json();
        setFormData({
          nama: data.nama,
          email: data.email,
          noHp: data.noHp,
        });
      } catch (error) {
        setPesanError(error.message);
      }
    };

    fetchPustakawan();
  }, [pustakawanId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, email, noHp } = formData;

    if (!nama || !email || !noHp) {
      setPesanError('Semua field harus diisi dengan benar');
      return;
    }

    setPesanError('');
    setPesanSukses('');

    try {
      const response = await fetch(`/api/update-pustakawan/${pustakawanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama,
          email,
          noHp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal memperbarui pustakawan');
      }

      setPesanSukses('Pustakawan berhasil diperbarui!');
      setTimeout(() => {
        router.push('/dashboard/pustakawan');
      }, 3000);
    } catch (error) {
      setPesanError(error.message || 'Terjadi kesalahan, silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg bg-white max-w-sm mx-auto">
      <h2 className="text-center text-xl text-dark font-semibold mb-4">Update Pustakawan</h2>
      {pesanError && <p className="text-red-700 mb-4">{pesanError}</p>}
      {pesanSukses && <p className="text-green-700 mb-4">{pesanSukses}</p>}
      <input type="text" name="nama" placeholder="Nama" value={formData.nama} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="number" name="noHp" placeholder="No HP" value={formData.noHp} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <button type="submit" className="w-full p-2 bg-primary text-white rounded-md hover:bg-secondary">
        Perbarui
      </button>
    </form>
  );
}
