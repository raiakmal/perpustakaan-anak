'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahPustakawan() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noHp: '',
  });
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validasiEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, email, noHp } = formData;

    if (!nama || !email || !noHp) {
      setPesanError('Semua field harus diisi dengan benar');
      return;
    }

    if (!validasiEmail(email)) {
      setPesanError('Email tidak valid');
      return;
    }

    setPesanError('');
    setPesanSukses('');

    try {
      const response = await fetch('/api/pustakawan', {
        method: 'POST',
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
        const data = await response.json();
        throw new Error(data.error || 'Gagal menambahkan pustakawan');
      }

      setPesanSukses('Pustakawan berhasil ditambahkan!');
      setFormData({
        nama: '',
        email: '',
        noHp: '',
      });

      setTimeout(() => {
        router.push('/dashboard/pustakawan');
      }, 3000);
    } catch (error) {
      setPesanError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg bg-white max-w-sm mx-auto">
      <h2 className="text-center text-xl text-dark font-semibold mb-4">Tambah Pustakawan</h2>
      {pesanError && <p className="text-red-700 mb-4">{pesanError}</p>}
      {pesanSukses && <p className="text-secondary mb-4">{pesanSukses}</p>}
      <input type="text" name="nama" placeholder="Nama" value={formData.nama} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="number" name="noHp" placeholder="No HP" value={formData.noHp} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <button type="submit" className="w-full p-2 bg-primary text-white rounded-md hover:bg-secondary">
        Simpan
      </button>
    </form>
  );
}
