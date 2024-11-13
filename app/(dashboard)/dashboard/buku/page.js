import Sidebar from '@/components/dashboard/sidebar';
import BukuBaru from '@/components/dashboard/buku/baru';
import KoleksiBuku from '@/components/dashboard/buku/koleksi';

export default function Home() {
  return (
    <div>
      <h1 className="font-semibold text-dark text-xl mt-1 mb-6 lg:text-2xl">Daftar Buku</h1>
      <BukuBaru />
      <KoleksiBuku />
    </div>
  );
}
