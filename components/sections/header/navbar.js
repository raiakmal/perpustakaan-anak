'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { user, isAuthenticated, getPermissions } = useKindeBrowserClient();

  // Fetch permissions once
  useEffect(() => {
    const fetchPermissions = async () => {
      const permissions = await getPermissions();
      console.log('Permissions:', permissions);
    };
    fetchPermissions();
  }, [getPermissions]);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const header = document.querySelector('header');
    if (header) {
      const fixedNav = header.getBoundingClientRect().top;
      setIsFixed(window.pageYOffset > fixedNav);
    }
  }, []);

  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smooth Scrolling
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const yOffset = -50;
      const yPosition = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  // Toggle Menu
  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div>
      <header className={`bg-transparent absolute top-0 left-0 w-full flex items-center z-20 ${isFixed ? 'navbar-fixed' : ''}`}>
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <Link href="/" className="font-bold text-lg text-primary block py-6">
                Awokwik
              </Link>
            </div>
            <div className="flex items-center px-4">
              {/* Hamburger Button */}
              <button
                id="hamburger"
                type="button"
                className={`block lg:hidden ${isMenuOpen ? 'hamburger-active' : ''}`}
                onClick={handleToggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="nav-menu"
                aria-label="Toggle navigation"
              >
                <span className={`hamburger-line ${isMenuOpen ? 'rotate-45' : ''} origin-top-left transition duration-300 ease-in-out`}></span>
                <span className={`hamburger-line ${isMenuOpen ? 'scale-0' : ''} transition duration-300 ease-in-out`}></span>
                <span className={`hamburger-line ${isMenuOpen ? '-rotate-45' : ''} origin-bottom-left transition duration-300 ease-in-out`}></span>
              </button>

              {/* Navigation Menu */}
              <nav
                id="nav-menu"
                className={`${isMenuOpen ? 'block' : 'hidden'} absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none`}
              >
                <ul className="block lg:flex">
                  <li className="group">
                    <Link href="/" className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                      Beranda
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="#tentang" onClick={(e) => handleSmoothScroll(e, 'tentang')} className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                      Tentang
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="#kategori" onClick={(e) => handleSmoothScroll(e, 'kategori')} className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                      Kategori
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="#rekomendasi" onClick={(e) => handleSmoothScroll(e, 'rekomendasi')} className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                      Rekomendasi
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="/kontak" className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                      Kontak
                    </Link>
                  </li>
                  {isAuthenticated && user?.permissions?.includes('admin') && (
                    <li className="group">
                      <Link href="/dashboard" className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="group">
                    {isAuthenticated ? (
                      <button className="font-medium text-md text-white bg-primary py-2 px-4 ml-6 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-300 ease-in-out">
                        <LogoutLink>Keluar</LogoutLink>
                      </button>
                    ) : (
                      <button className="font-medium text-md text-white bg-primary py-2 px-4 ml-6 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-300 ease-in-out">
                        <LoginLink>Masuk</LoginLink>
                      </button>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
