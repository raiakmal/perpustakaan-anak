'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // Handle Scroll Event
  const handleScroll = () => {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if (window.pageYOffset > fixedNav) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth Scrolling
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);

    if (target) {
      const yOffset = -50;
      const yPosition = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: yPosition,
        behavior: 'smooth',
      });
    }
  };

  // Handle Hamburger Menu Toggle
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className={`bg-transparent absolute top-0 left-0 w-full flex items-center z-20 ${isFixed ? 'navbar-fixed' : ''}`}>
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <Link href="#" className="font-bold text-lg text-primary block py-6">
                Awokwik
              </Link>
            </div>
            <div className="flex items-center px-4">
              {/* Hamburger Button */}
              <button
                id="hamburger"
                name="hamburger"
                type="button"
                className={`block lg:hidden ${isMenuOpen ? 'hamburger-active' : ''}`} // Conditionally add the active class
                onClick={handleToggleMenu}
                aria-expanded={isMenuOpen}
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
                    <Link href="#" className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
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
                    <Link href="#layanan" onClick={(e) => handleSmoothScroll(e, 'layanan')} className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                      Layanan
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="#" className="text-base text-dark py-2 mx-8 flex group-hover:text-primary">
                      Kontak
                    </Link>
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
