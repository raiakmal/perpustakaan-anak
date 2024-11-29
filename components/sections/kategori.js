'use client';

import Link from "next/link";

const Kategori = ({ id }) => {
  return (
    <section id={id} className="py-16 shadow-xl">
      <div className="container">
        <div className="w-full px-4">
          <div className="max-w-full mx-auto mb-16 text-center">
            <h4 className="mb-3 text-lg font-bold uppercase text-primary">Kategori</h4>
            <h2 className="mb-3 text-xl font-bold text-dark lg:text-3xl">Terbaik dari Kami</h2>
            <p className="max-w-xl mx-auto text-base text-slate lg:text-lg">Temukan buku yang seru, mendidik, dan penuh petualangan untuk mengembangkan imajinasi dan kreativitas!</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full px-4 lg:space-x-20">
          {/* Kategori 1 */}
          <Link href="/edukasi">
            <div className="p-4 mb-12 transition duration-300 hover:scale-105">
              <div className="flex justify-center rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 mb-4 text-primary">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="mt-6 mb-3 text-xl font-semibold text-center text-dark lg:text-2xl">Edukasi</h3>
            </div>
          </Link>

          {/* Kategori 2 */}
          <Link href="/fiksi">
            <div className="p-4 mb-12 transition duration-300 hover:scale-105">
              <div className="flex justify-center rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 mb-4 text-primary">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="mt-6 mb-3 text-xl font-semibold text-center text-dark lg:text-2xl">Fiksi</h3>
            </div>
          </Link>

          {/* Kategori 3 */}
          <Link href="/cerita">
            <div className="p-4 mb-12 transition duration-300 hover:scale-105">
              <div className="flex justify-center rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 mb-4 text-primary">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="mt-6 mb-3 text-xl font-semibold text-center text-dark lg:text-2xl">Cerita</h3>
            </div>
          </Link>

          {/* Kategori 4 */}
          <Link href="/sejarah">
            <div className="p-4 mb-12 transition duration-300 hover:scale-105">
              <div className="flex justify-center rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 mb-4 text-primary">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="mt-6 mb-3 text-xl font-semibold text-center text-dark lg:text-2xl">Sejarah</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Kategori;
