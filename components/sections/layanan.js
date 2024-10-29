'use client';

import Image from 'next/image';

const Layanan = () => {
  return (
    <section id="layanan" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="font-bold uppercase text-primary text-lg mb-3">Layanan</h4>
          <h2 className="font-bold text-dark text-2xl lg:text-3xl mb-3">Untuk Anda</h2>
          <p className="text-base text-slate max-w-xl mx-auto lg:text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati et perspiciatis magnam sit maxime ratione!</p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3 mb-10">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <Image src="/assets/layanan/layanan1.jpg" alt="kategori-1" width={500} height={300} className="w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  <a href="#" className="hover:text-primary">
                    Layanan 1
                  </a>
                </h3>
                <p className="text-base text-slate mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, repellat!</p>
                <a href="#" className="inline-block text-sm text-white bg-primary py-2 px-4 rounded-lg hover:bg-secondary transition duration-300">
                  Selengkapnya
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3 mb-10">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <Image src="/assets/layanan/layanan2.jpg" alt="kategori" width={500} height={300} className="w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  <a href="#" className="hover:text-primary">
                    Layanan 2
                  </a>
                </h3>
                <p className="text-base text-slate mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, repellat!</p>
                <a href="#" className="inline-block text-sm text-white bg-primary py-2 px-4 rounded-lg hover:bg-secondary transition duration-300">
                  Selengkapnya
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3 mb-10">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <Image src="/assets/layanan/layanan3.jpg" alt="kategori" width={500} height={300} className="w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  <a href="#" className="hover:text-primary">
                    Layanan 3
                  </a>
                </h3>
                <p className="text-base text-slate mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, repellat!</p>
                <a href="#" className="inline-block text-sm text-white bg-primary py-2 px-4 rounded-lg hover:bg-secondary transition duration-300">
                  Selengkapnya
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layanan;
