"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Handle Scroll Event
  const handleScroll = () => {
    const header = document.querySelector('header');
    if (header) {
      const fixedNav = header.getBoundingClientRect().top;
      setIsFixed(window.pageYOffset > fixedNav);
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
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  // Handle Hamburger Menu Toggle
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Login Form Toggle
  const handleToggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Pastikan respons berupa JSON
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Jika login berhasil
      alert(data.message);
      setIsLoginOpen(false);
      router.push('/dashboard'); // Redirect ke halaman dashboard setelah login berhasil
    } catch (error) {
      console.error('Login error:', error.message);
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  };

  return (
    <div>
      <header className={`bg-transparent absolute top-0 left-0 w-full flex items-center z-20 ${isFixed ? 'navbar-fixed' : ''}`}>
        <div className="container">
          <div className="relative flex items-center justify-between">
            <div className="px-4">
              <Link href="/" className="block py-6 text-lg font-bold text-primary">
                Awokwik
              </Link>
            </div>
            <div className="flex items-center px-4">
              {/* Hamburger Button */}
              <button id="hamburger" type="button" className={`block lg:hidden ${isMenuOpen ? 'hamburger-active' : ''}`} onClick={handleToggleMenu} aria-expanded={isMenuOpen} aria-label="Toggle navigation">
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
                    <Link href="/" className="flex py-2 mx-8 text-base text-dark group-hover:text-primary">
                      Beranda
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="#tentang" onClick={(e) => handleSmoothScroll(e, 'tentang')} className="flex py-2 mx-8 text-base text-dark group-hover:text-primary">
                      Tentang
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="#kategori" onClick={(e) => handleSmoothScroll(e, 'kategori')} className="flex py-2 mx-8 text-base text-dark group-hover:text-primary">
                      Kategori
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="#rekomendasi" onClick={(e) => handleSmoothScroll(e, 'rekomendasi')} className="flex py-2 mx-8 text-base text-dark group-hover:text-primary">
                      Rekomendasi
                    </Link>
                  </li>
                  <li className="group">
                    <Link href="/user/kontak" className="flex py-2 mx-8 text-base text-dark group-hover:text-primary">
                      Kontak
                    </Link>
                  </li>
                  <li className="group">
                    <button
                      onClick={handleToggleLogin}
                      className="px-4 py-2 ml-6 font-medium text-white transition-colors duration-300 ease-in-out rounded-lg text-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                    >
                      Login
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Form Login Overlay */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-50 bg-dark">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <button className="absolute flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full -top-4 -right-4 hover:bg-gray-300 focus:outline-none" onClick={handleToggleLogin} aria-label="Close">
              <i className="text-lg ri-close-line"></i>
            </button>

            <h2 className="text-2xl font-bold text-center text-primary">Awokwik</h2>
            <h2 className="mb-6 text-2xl font-bold text-center text-dark">LOGIN</h2>

            <form onSubmit={handleLogin}>
              <div className="relative mb-4">
                <i className="absolute text-xl text-gray-400 ri-user-line left-3 top-3"></i>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="w-full p-3 pl-10 border border-gray-300 rounded focus:border-primary focus:outline-none"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative mb-6">
                <i className="absolute text-xl text-gray-400 ri-lock-line left-3 top-3"></i>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full p-3 pl-10 border border-gray-300 rounded focus:border-primary focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 font-medium text-white transition-colors duration-300 ease-in-out rounded-lg text-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;