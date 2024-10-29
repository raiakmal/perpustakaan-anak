'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
  const backgrounds = ['bg-hero-1', 'bg-hero-2', 'bg-hero-3'];
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prevBackground) => (prevBackground + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section id="hero" className="pt-20">
      <div className={`hero relative h-screen flex items-center justify-center text-center text-white ${backgrounds[currentBackground]} bg-cover bg-center`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Konten */}
        <div className="relative z-10 max-w-screen-lg px-4">
          <h3 className="text-lg lg:text-xl">Selamat Datang di</h3>
          <h1 className="font-semibold text-primary text-5xl mt-1 mb-6 lg:text-6xl">Awokwik</h1>
          <p className="text-base mb-10 mx-auto max-w-2xl lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, provident!</p>
          <a href="#" className="font-medium text-md text-white bg-primary py-3 px-6 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-300 ease-in-out">
            Hubungi Kami 😊
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
