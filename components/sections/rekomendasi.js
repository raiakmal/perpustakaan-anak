'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Rekomendasi = ({ id }) => {
  const books = [
    {
      id: 1,
      title: 'Aku Anak Indonesia',
      image: 'https://res.cloudinary.com/db88xk5t7/image/upload/v1732600596/aku-anak-indonesia_cfqdzb.jpg',
      link: '/book/1', // Assuming the detail page URL is structured like this
    },
    {
      id: 2,
      title: 'Buku Cerita',
      image: 'https://res.cloudinary.com/db88xk5t7/image/upload/v1732600597/buku-cerita_lmsxw3.jpg',
      link: '/',
    },
    {
      id: 3,
      title: 'Buku Seri',
      image: 'https://res.cloudinary.com/db88xk5t7/image/upload/v1732600596/buku-seri_l7dj4d.jpg',
      link: '/',
    },
    {
      id: 4,
      title: 'Buku Tuntutan Ibadah',
      image: 'https://res.cloudinary.com/db88xk5t7/image/upload/v1732600597/buku-tuntutan_at0h4v.jpg',
      link: '/',
    },
    {
      id: 5,
      title: 'Muslim Kids',
      image: 'https://res.cloudinary.com/db88xk5t7/image/upload/v1732600597/muslim-kids_cndcau.jpg',
      link: '/',
    },
    {
      id: 6,
      title: 'Teman Baru',
      image: 'https://res.cloudinary.com/db88xk5t7/image/upload/v1732600596/teman-baru_oe6her.jpg',
      link: '/',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < books.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id={id} className="relative w-full max-w-5xl mx-auto py-16">
      <div className="max-w-full mx-auto text-center mb-16">
        <h4 className="font-bold uppercase text-primary text-lg mb-3">Rekomendasi</h4>
        <h2 className="font-bold text-dark text-xl mb-3 lg:text-3xl">Untuk Anda</h2>
        <p className="text-base text-slate mx-auto max-w-xl lg:text-lg">Temukan buku seru, edukatif, dan menarik untuk anak-anak!</p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        {/* Tombol Sebelumnya */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'} transition duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
          </svg>
        </button>

        {/* Slide yang Aktif */}
        <div className="grid grid-cols-4 gap-4">
          {visibleBooks.map((book) => (
            <div key={book.id} className="flex flex-col items-center transition-all duration-300 hover:scale-105">
              <Link href={book.link}>
                <Image
                  src={book.image}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="object-cover rounded-lg shadow-lg max-h-60"
                />
                <h3 className="text-sm font-semibold mt-3">{book.title}</h3>
              </Link>
            </div>
          ))}
        </div>

        {/* Tombol Selanjutnya */}
        <button
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= books.length}
          className={`bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${currentIndex + itemsPerPage >= books.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'} transition duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Rekomendasi;
