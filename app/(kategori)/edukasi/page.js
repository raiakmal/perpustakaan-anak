import Link from 'next/link';
import Image from 'next/image';

async function fetchBooksByCategory(kategori) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${kategori}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  return res.json();
}

export default async function EdukasiPage() {
  const books = await fetchBooksByCategory('Edukasi'); // Menggunakan "books" agar konsisten dengan istilah data buku

  return (
    <div className="relative px-4 lg:px-0">
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          {/* Tombol Kembali */}
          <div className="mb-4">
            <Link
              href="/"
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

          {/* Judul Halaman */}
          <h2 className="mb-8 text-3xl font-bold text-center text-primary">Kategori Edukasi</h2>

          {/* Kondisi jika buku kosong */}
          {books.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada buku dalam kategori ini.</p>
          ) : (
            <div className="relative grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((b) => (
                <div
                  key={b.id}
                  className="p-4 transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105"
                >
                  {/* Placeholder untuk gambar */}
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={b.imagePath}
                      alt={b.judul}
                      width={100}
                      height={150}
                      className="object-cover rounded-md"
                      layout="intrinsic"
                      quality={80}
                    />
                  </div>

                  {/* Informasi Buku */}
                  <h3 className="font-semibold text-md text-gray-800 mb-4 truncate w-48 md:w-60">
                    {b.judul}
                  </h3>
                  <p className="text-gray-500">Penulis : {b.penulis}</p>
                  <p className="text-gray-500">Kategori : {b.kategori}</p>

                  {/* Informasi Stok dan Tombol Pinjam */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500"><strong>Stok : </strong>{b.stok}</p>
                    <Link
                      href={b.stok > 0 ? `/edukasi/detail/${b.id}` : '#'}
                      className={`px-4 py-2 text-white rounded-lg ${
                        b.stok > 0
                          ? 'bg-primary hover:bg-secondary'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {b.stok > 0 ? 'Pinjam' : 'Habis'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
