import Link from 'next/link';

const Body = () => {
  return (
    <div>
      <h1 className="font-semibold text-dark text-xl mt-1 mb-6 lg:text-2xl">Hello, selamat datang</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="mb-12 relative max-w-sm">
          <Link href="/dashboard/buku">
            <div className="rounded-lg shadow-xl p-4 flex flex-col duration-300 hover:scale-105 w-full h-full">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-slate text-md mt-6 mb-3 lg:text-lg">Buku Baru Ditambahkan</h3>
                  <p className="text-slate">20 Buku baru ditambahkan di Perpustakaan</p>
                </div>
                <div className="p-2">
                  <i className="ri-add-line text-3xl text-dark"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="mb-12 relative max-w-sm">
          <Link href="/dashboard/buku">
            <div className="rounded-lg shadow-xl p-4 flex flex-col duration-300 hover:scale-105 w-full h-full">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-slate text-md mt-6 mb-3 lg:text-lg">Buku Hilang</h3>
                  <p className="text-slate">20 Buku tidak ada di Perpustakaan</p>
                </div>
                <div className="p-2">
                  <i className="ri-close-line text-3xl text-dark"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="mb-12 relative max-w-sm">
          <Link href="/dashboard/buku">
            <div className="rounded-lg shadow-xl p-4 flex flex-col duration-300 hover:scale-105 w-full h-full">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-slate text-md mt-6 mb-3 lg:text-lg">Buku Dipinjam</h3>
                  <p className="text-slate">20 Buku dipinjam</p>
                </div>
                <div className="p-2">
                  <i className="ri-arrow-down-line text-3xl text-dark"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="mb-12 relative max-w-sm">
          <Link href="/dashboard/buku">
            <div className="rounded-lg shadow-xl p-4 flex flex-col duration-300 hover:scale-105 w-full h-full">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-slate text-md mt-6 mb-3 lg:text-lg">Buku Tersedia</h3>
                  <p className="text-slate">100 Buku tersedia</p>
                </div>
                <div className="p-2">
                  <i className="ri-check-line text-3xl text-dark"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Body;
