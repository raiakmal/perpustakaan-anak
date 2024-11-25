import Navbar from './navbar';
import Hero from '../sections/hero';
import Tentang from '../sections/tentang';
import Kategori from '../sections/kategori';
import Rekomendasi from '../sections/rekomendasi';
import Footer from '../sections/footer/footer';

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
