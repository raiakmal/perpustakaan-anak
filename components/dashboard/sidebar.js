'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle button for mobile view */}
      <button
        id="hamburger"
        name="hamburger"
        type="button"
        className={`block md:hidden ${isOpen ? 'hamburger-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        style={{ zIndex: 9999 }} // Ensure the hamburger button is above all other content
      >
        <span className={`hamburger-line ${isOpen ? 'rotate-45' : ''} origin-top-left transition duration-300 ease-in-out`}></span>
        <span className={`hamburger-line ${isOpen ? 'scale-0' : ''} transition duration-300 ease-in-out`}></span>
        <span className={`hamburger-line ${isOpen ? '-rotate-45' : ''} origin-bottom-left transition duration-300 ease-in-out`}></span>
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 h-full bg-primary text-white z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 md:relative md:translate-x-0 md:z-10`}>
        <div className="sticky top-0">
          <div className="flex items-center justify-center mb-10">
            <h2 className="font-bold text-2xl mt-10">Awokwik</h2>
          </div>
          <nav className="space-y-6 p-6">
            <Link href="/dashboard" className="flex items-center space-x-2 text-lg p-2 rounded-lg hover:bg-secondary transition-colors duration-300 ease-in-out">
              <i className="ri-home-4-line text-xl"></i>
              <span>Beranda</span>
            </Link>
            <Link href="/dashboard/buku" className="flex items-center space-x-2 text-lg p-2 rounded-lg hover:bg-secondary transition-colors duration-300 ease-in-out">
              <i className="ri-book-open-line text-xl"></i>
              <span>Buku</span>
            </Link>
            <Link href="/dasboard/siswa" className="flex items-center space-x-2 text-lg p-2 rounded-lg hover:bg-secondary transition-colors duration-300 ease-in-out">
              <i className="ri-team-line text-xl"></i>
              <span>Siswa</span>
            </Link>
            <Link href="/dashboard/pustakawan" className="flex items-center space-x-2 text-lg p-2 rounded-lg hover:bg-secondary transition-colors duration-300 ease-in-out">
              <i className="ri-group-line text-xl"></i>
              <span>Pustakawan</span>
            </Link>
          </nav>
          <button className="font-medium text-lg text-white py-2 px-4 ml-12 mt-8 rounded-lg border-2 border-white hover:bg-secondary transition-colors duration-300 ease-in-out">
            <LogoutLink>Logout</LogoutLink>
          </button>
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true"></div>}
    </div>
  );
}
