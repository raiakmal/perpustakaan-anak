'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Pustakawan() {
  const [pustakawan, setPustakawan] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [librarianToDelete, setLibrarianToDelete] = useState(null);
  const router = useRouter();
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('/api/pustakawan')
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPustakawan(sortedData);
      });
  }, []);

  const handleDelete = async () => {
    if (!librarianToDelete) return;
    try {
      const response = await fetch(`/api/pustakawan?id=${librarianToDelete}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Gagal menghapus Pustakawan');
      }
      alert('Pustakawan berhasil dihapus');
      setShowConfirmPopup(false);
      setPustakawan(pustakawan.filter((p) => p.id !== librarianToDelete));
      setLibrarianToDelete(null);
    } catch (error) {
      console.error('Error saat menghapus Pustakawan:', error);
      alert('Terjadi kesalahan saat menghapus Pustakawan');
    }
  };

  const handleUpdate = (id) => {
    router.push(`/dashboard/pustakawan/update-pustakawan?id=${id}`);
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < pustakawan.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const visibleLibrarian = pustakawan.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <>
      {/* Dashboard */}
      <div className="w-full my-10">
        <Link href="/dashboard/pustakawan/tambah-pustakawan">
          <div className="max-w-[220px] shadow-lg rounded-lg overflow-hidden mt-20 mb-10 trasition duration-300 hover:scale-105 border-2 hover:shadow-md hover:shadow-secondary">
            <div className="flex justify-center">
              <h3 className="text-xl font-medium text-slate">Tambah</h3>
            </div>
            <div className="flex justify-center bg-gray-100 py-5">
              <i className="ri-add-box-line text-lg md:text-5xl text-secondary opacity-50"></i>
            </div>
          </div>
        </Link>
        <h2 className="font-medium text-slate text-xl mt-1 mb-6 lg:text-2xl">Daftar Pustakawan</h2>
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
            {visibleLibrarian.map((p) => (
              <div key={p.id} className="flex flex-col items-center rounded-lg shadow-xl p-4 border-2 hover:shadow-md hover:shadow-secondary">
                <div className="mb-4 flex justify-center">
                  <i className="ri-user-fill text-4xl text-primary"></i>
                </div>
                <div>
                  <p className="text-gray-500">Nama : {p.nama}</p>
                  <p className="text-gray-500">Email : {p.email}</p>
                  <p className="text-gray-500">No. Handphone : {p.noHp}</p>
                </div>
                <div className="mt-8 flex justify-center space-x-8">
                  <i
                    onClick={() => {
                      setLibrarianToDelete(p.id);
                      setShowConfirmPopup(true);
                    }}
                    className="ri-delete-bin-line text-2xl text-slate hover:text-secondary cursor-pointer"
                  ></i>
                  <i onClick={() => handleUpdate(p.id)} className="ri-edit-line text-2xl text-slate hover:text-secondary cursor-pointer"></i>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Selanjutnya */}
          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= pustakawan.length}
            className={`bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              currentIndex + itemsPerPage >= pustakawan.length ? 'opacity-0 cursor-not-allowed' : 'hover:bg-secondary'
            } transition duration-300`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Popup Konfirmasi Hapus */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Penghapusan</h3>
            <p>Apakah Anda yakin ingin menghapus Pustakawan?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  setLibrarianToDelete(null);
                }}
                className="bg-gray-200 text-slate px-4 py-2 rounded-lg"
              >
                Tidak
              </button>
              <button onClick={handleDelete} className="bg-red-700 text-white px-4 py-2 rounded-lg">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
