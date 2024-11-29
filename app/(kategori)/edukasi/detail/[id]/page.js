'use client';

import { useEffect, useState } from 'react';
import { use } from 'react'; // Pastikan React.use diimpor
import Link from 'next/link';
import Image from 'next/image';

export default function BookDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap params menggunakan React.use
  const { id } = params; // Ambil id dari params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    namaSiswa: '',
    kelas: '',
    email: '',
    noHp: '',
    tanggalPinjam: '',
    tanggalKembali: '',
  });

  // Fetch detail buku berdasarkan ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/edukasi/${id}`);
        if (!response.ok) {
          throw new Error('Gagal memuat detail buku');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  // Update tanggalKembali setiap tanggalPinjam berubah
  useEffect(() => {
    if (formData.tanggalPinjam) {
      const pinjamDate = new Date(formData.tanggalPinjam);
      const kembaliDate = new Date(pinjamDate);
      kembaliDate.setDate(kembaliDate.getDate() + 7); // Tambah 7 hari
      setFormData((prev) => ({
        ...prev,
        tanggalKembali: kembaliDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        tanggalKembali: '',
      }));
    }
  }, [formData.tanggalPinjam]);

  // Fungsi untuk menangani perubahan di form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/peminjaman', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bukuId: parseInt(id),
          namaSiswa: formData.namaSiswa,
          kelas: formData.kelas,
          email: formData.email,
          noHp: formData.noHp,
          tanggalPinjam: formData.tanggalPinjam,
          tanggalKembali: formData.tanggalKembali,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengajukan peminjaman');
      }

      alert('Peminjaman berhasil diajukan!');
      setFormData({
        namaSiswa: '',
        kelas: '',
        email: '',
        noHp: '',
        tanggalPinjam: '',
        tanggalKembali: '',
      });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-primary flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-screen-lg mx-auto bg-white border rounded-lg shadow-lg p-6 space-y-6 mt-6">
        <div className="mb-4">
          <Link
            href="/edukasi"
            className="inline-flex items-center px-3 py-2 text-sm text-white bg-primary rounded-md hover:bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Kembali
          </Link>
        </div>

        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-primary text-center">Formulir Peminjaman</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Detail Buku */}
          <div className="w-full lg:w-1/3 flex flex-col border p-4 bg-gray-50 rounded-md">
            <Image
              src={book.imagePath}
              alt={book.judul}
              width={200}
              height={300}
              className="rounded-md"
            />
            <h2 className="font-semibold text-gray-800 my-4">{book.judul}</h2>
            <p className="text-gray-500">Penulis: {book.penulis}</p>
            <p className="text-gray-500">Penerbit: {book.penerbit}</p>
            <p className="text-gray-500">Tahun Terbit: {book.tahunTerbit}</p>
            <p className="text-gray-500 mt-2">
              <strong>Stok:</strong> {book.stok}
            </p>
          </div>

          {/* Formulir Peminjaman */}
          <div className="w-full lg:w-2/3 border-2 p-4 bg-white rounded-md shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input Form */}
              {['namaSiswa', 'kelas', 'email', 'noHp', 'tanggalPinjam'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block font-medium capitalize">
                    {field === 'tanggalPinjam' ? 'Tanggal Pinjam' : field}
                  </label>
                  <input
                    type={field === 'tanggalPinjam' ? 'date' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
              ))}

              {/* Tanggal Kembali */}
              <div>
                <label htmlFor="tanggalKembali" className="block font-medium">
                  Tanggal Kembali
                </label>
                <input
                  type="date"
                  id="tanggalKembali"
                  name="tanggalKembali"
                  value={formData.tanggalKembali}
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                className="w-full lg:w-60 p-2 bg-primary text-white rounded-md hover:bg-secondary"
              >
                Pinjam
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}