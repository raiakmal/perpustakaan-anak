import Navbar from '../../../components/sections/header/navbar';
import Hero from '@/components/sections/hero';
import Tentang from '../../../components/sections/tentang';
import Kategori from '../../../components/sections/kategori';
import Rekomendasi from '../../../components/sections/rekomendasi';
import Footer from '../../../components/sections/footer/footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tentang id="tentang" />
      <Kategori id="kategori" />
      <Rekomendasi id="rekomendasi" />
      <Footer />
    </div>
  );
};

export default LandingPage;
