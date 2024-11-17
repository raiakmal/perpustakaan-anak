'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function KoleksiBuku() {
  const [buku, setBuku] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const router = useRouter();
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('/api/buku')
      .then((res) => res.json())
      .then((data) => setBuku(data));
  }, []);

  const handleDelete = async () => {
    if (!bookToDelete) return;
    try {
      const response = await fetch(`/api/buku?id=${bookToDelete}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Gagal menghapus buku');
      }
      alert('Buku berhasil dihapus');
      setShowConfirmPopup(false);
      setBuku(buku.filter((b) => b.id !== bookToDelete));
      setBookToDelete(null);
    } catch (error) {
      console.error('Error saat menghapus buku:', error);
      alert('Terjadi kesalahan saat menghapus buku');
    }
  };

  const handleUpdate = (id) => {
    router.push(`/dashboard/buku/update-buku?id=${id}`);
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < buku.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const visibleBooks = buku.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <>
      {/* Dashboard */}
      <h2 className="font-medium text-slate text-xl mt-1 mb-6 lg:text-2xl">Koleksi Buku Lainnya</h2>
      {/* Carousel Wrapper */}
      <div className="flex items-center justify-center space-x-4">
        {/* Tombol Sebelumnya */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${currentIndex === 0 ? 'opacity-0 cursor-not-allowed' : 'hover:bg-secondary'} transition duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
          </svg>
        </button>

        {/* Carousel Konten */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleBooks.map((b) => (
            <div key={b.id} className="flex flex-col items-center rounded-lg shadow-xl p-4 border-2 hover:shadow-md hover:shadow-secondary">
              <div className="mb-4 flex justify-center">
                <Image src={b.imagePath} alt={b.judul} width={100} height={150} className="object-cover rounded-md" layout="intrinsic" quality={80} />
              </div>
              <div>
                <h3 className="font-semibold text-md text-gray-800 mb-4 truncate w-48 md:w-60">{b.judul}</h3>
                <p className="text-gray-500">Penulis : {b.penulis}</p>
                <p className="text-gray-500">Kategori : {b.kategori}</p>
                <p className="text-gray-500">Ketersediaan : {b.stok}</p>
              </div>
              <div className="mt-8 flex justify-center space-x-8">
                <i
                  onClick={() => {
                    setBookToDelete(b.id);
                    setShowConfirmPopup(true);
                  }}
                  className="ri-delete-bin-line text-2xl text-slate hover:text-secondary"
                ></i>
                <i onClick={() => handleUpdate(b.id)} className="ri-edit-line text-2xl text-slate hover:text-secondary cursor-pointer"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Selanjutnya */}
        <button
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= buku.length}
          className={`bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${currentIndex + itemsPerPage >= buku.length ? 'opacity-0 cursor-not-allowed' : 'hover:bg-secondary'} transition duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </button>
      </div>

      {/* Popup Konfirmasi Hapus */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Penghapusan</h3>
            <p>Apakah Anda yakin ingin menghapus buku ini?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  setBookToDelete(null);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  handleDelete(bookToDelete);
                }}
                className="bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
