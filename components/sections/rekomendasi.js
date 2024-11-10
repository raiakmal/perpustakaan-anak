'use client';

import { useState } from 'react';

const Rekomendasi = ({ id }) => {
  const books = [
    {
      id: 1,
      title: 'Celebrate the day of Forest',
      image: '/assets/rekomendasi/buku1.jp',
    },
    {
      id: 2,
      title: 'Green Nature Think',
      image: '/assets/rekomendasi/buku2.jp',
    },
    {
      id: 3,
      title: 'The Beauty Of Dreams',
      image: '/assets/rekomendasi/buku3.jp',
    },
    {
      id: 4,
      title: 'Camping at The Mountain',
      image: '/assets/rekomendasi/buku4.jp',
    },
    {
      id: 5,
      title: 'Camping at The Forest',
      image: '/assets/rekomendasi/buku5.jp',
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
        <p className="text-base text-slate mx-auto max-w-xl lg:text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati et perspiciatis magnam sit maxime ratione!</p>
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
            <div key={book.id} className="flex flex-col items-center">
              <img src={book.image} alt={book.title} className="w-40 h-60 object-cover rounded-lg shadow-lg" />
              <h3 className="text-sm font-semibold mt-3">{book.title}</h3>
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
