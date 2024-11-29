'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahBuku() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    judul: '',
    penulis: '',
    penerbit: '',
    tahunTerbit: '',
    kategori: '',
    stok: 0,
    imagePath: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formDataFile = new FormData();
    formDataFile.append('file', file);

    setIsLoading(true);
    setUploadError('');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataFile,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengunggah gambar');
      }

      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        imagePath: data.url,
      }));
    } catch (error) {
      setUploadError('Gagal mengunggah gambar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { judul, penulis, penerbit, tahunTerbit, kategori, stok, imagePath } = formData;

    if (!judul || !penulis || !penerbit || !tahunTerbit || !kategori || stok <= 0 || !imagePath) {
      setErrorMessage('Semua field harus diisi dengan benar');
      return;
    }

    if (isNaN(stok) || isNaN(tahunTerbit)) {
      setErrorMessage('Stok dan Tahun Terbit harus berupa angka');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    const stokInt = parseInt(stok, 10);
    const tahunTerbitInt = parseInt(tahunTerbit, 10);

    try {
      const response = await fetch('/api/buku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judul,
          penulis,
          penerbit,
          tahunTerbit: tahunTerbitInt,
          kategori,
          stok: stokInt,
          imagePath,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal menambahkan buku');
      }

      setSuccessMessage('Buku berhasil ditambahkan!');

      setTimeout(() => {
        router.push('/dashboard/buku');
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg bg-white max-w-sm mx-auto">
      <h2 className="text-center text-xl text-dark font-semibold mb-4">Tambah Buku</h2>
      {errorMessage && <p className="text-red-700 mb-4">{errorMessage}</p>}
      {uploadError && <p className="text-red-700 mb-4">{uploadError}</p>}
      {successMessage && <p className="text-secondary mb-4">{successMessage}</p>}
      <input type="text" name="judul" placeholder="Judul Buku" value={formData.judul} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="text" name="penulis" placeholder="Penulis" value={formData.penulis} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="text" name="penerbit" placeholder="Penerbit" value={formData.penerbit} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" />
      <input type="number" name="tahunTerbit" placeholder="Tahun Terbit" value={formData.tahunTerbit} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required>
        <option value="">Pilih Kategori</option>
        <option value="Edukasi">Edukasi</option>
        <option value="Fiksi">Fiksi</option>
        <option value="Cerita">Cerita</option>
        <option value="Sejarah">Sejarah</option>
      </select>
      <input type="number" name="stok" placeholder="Stok" value={formData.stok} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="file" name="gambar" onChange={handleFileChange} className="w-full p-2 mb-4 border rounded-md" required />
      {isLoading && <p className="text-secondary mb-4">Mengunggah gambar...</p>}
      <button type="submit" className="w-full p-2 bg-primary text-white rounded-md hover:bg-secondary">
        Simpan
      </button>
    </form>
  );
}
