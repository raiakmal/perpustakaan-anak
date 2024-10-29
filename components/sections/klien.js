'use client';

import Image from 'next/image';

const Klien = () => {
  return (
    <section id="klien" className="py-12 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="font-bold uppercase text-primary text-lg mb-3">Klien</h4>
          <h2 className="font-bold text-white text-2xl lg:text-3xl mb-3">Klien Kami</h2>
          <p className="text-base text-slate lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, unde.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          <a href="#" className="max-w-[120px] mx-4 py-4 grayscale transition duration-300 hover:grayscale-0 lg:mx-6 xl:mx-8">
            <Image src="/assets/kliens/google.svg" alt="google" width={120} height={120} />
          </a>
          <a href="#" className="max-w-[120px] mx-4 py-4 grayscale transition duration-300 hover:grayscale-0 lg:mx-6 xl:mx-8">
            <Image src="/assets/kliens/microsoft.svg" alt="microsoft" width={120} height={120} />
          </a>
          <a href="#" className="max-w-[120px] mx-4 py-4 grayscale transition duration-300 hover:grayscale-0 lg:mx-6 xl:mx-8">
            <Image src="/assets/kliens/goto.svg" alt="goto" width={120} height={120} />
          </a>
          <a href="#" className="max-w-[120px] mx-4 py-4 grayscale transition duration-300 hover:grayscale-0 lg:mx-6 xl:mx-8">
            <Image src="/assets/kliens/traveloka.svg" alt="traveloka" width={120} height={120} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Klien;
