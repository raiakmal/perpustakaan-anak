import DataSiswa from '@/components/dashboard/siswa/data-siswa';

export default function Home() {
  return (
    <div>
      <h1 className="font-semibold text-dark text-xl mt-1 mb-6 lg:text-2xl">Daftar Siswa</h1>
      <DataSiswa />
    </div>
  );
}
