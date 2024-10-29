import Navbar from '../header/navbar';
import Hero from '@/components/sections/hero';
import Tentang from '../sections/tentang';
import Kategori from '../sections/kategori';
import Layanan from '../sections/layanan';
import Klien from '../sections/klien';
import Footer from '../footer/footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tentang />
      <Kategori />
      <Layanan />
      <Klien />
      <Footer />
    </div>
  );
};

export default LandingPage;
