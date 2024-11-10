'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center px-4">
      {/* Toggle button for mobile view */}
      {/* Hamburger Button */}
      <button id="hamburger" name="hamburger" type="button" className={`block md:hidden ${isOpen ? 'hamburger-active' : ''}`} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle navigation">
        <span className={`hamburger-line ${isOpen ? 'rotate-45' : ''} origin-top-left transition duration-300 ease-in-out`}></span>
        <span className={`hamburger-line ${isOpen ? 'scale-0' : ''} transition duration-300 ease-in-out`}></span>
        <span className={`hamburger-line ${isOpen ? '-rotate-45' : ''} origin-bottom-left transition duration-300 ease-in-out`}></span>
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 md:z-10 w-64 bg-primary text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 md:translate-x-0`}>
        <div className="p-4">
          <h2 className="font-bold text-2xl">Awokwik</h2>
        </div>
        <nav className="space-y-4 p-6">
          <Link href="#" className="block text-lg">
            Beranda
          </Link>
          <Link href="#" className="block text-lg">
            Buku
          </Link>
          <Link href="#" className="block text-lg">
            Siswa
          </Link>
          <Link href="#" className="block text-lg">
            Pustakawan
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
}
