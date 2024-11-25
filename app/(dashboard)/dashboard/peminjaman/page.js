import DataPeminjaman from '@/components/dashboard/peminjaman/data-peminjaman';

export default function Home() {
  return (
    <div>
      <h1 className="font-semibold text-dark text-xl mt-1 mb-6 lg:text-2xl">Data Peminjaman</h1>
      <DataPeminjaman />
    </div>
  );
}
