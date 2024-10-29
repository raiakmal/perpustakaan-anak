'use clien';

const Kategori = () => {
  return (
    <section id="kategori" className="py-16 shadow-xl">
      <div className="container">
        <div className="w-full px-4">
          <div className="max-w-full mx-auto text-center mb-16">
            <h4 className="font-bold uppercase text-primary text-lg mb-3">Kategori</h4>
            <h2 className="font-bold text-dark text-xl mb-3 lg:text-3xl">Terbaik dari Kami</h2>
            <p className="text-base text-slate mx-auto max-w-xl lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, reiciendis.</p>
          </div>
        </div>
        <div className="w-full px-4 flex flex-wrap justify-center lg:space-x-20">
          <a href="#">
            <div className="mb-12 p-4 trasition duration-300 hover:scale-105">
              <div className="rounded-md shadow-md flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-primary mb-4">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-dark text-center text-xl mt-6 mb-3 lg:text-2xl">Kategori 1</h3>
            </div>
          </a>
          <a href="#">
            <div className="mb-12 p-4 trasition duration-300 hover:scale-105">
              <div className="rounded-md shadow-md flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-primary mb-4">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-dark text-center text-xl mt-6 mb-3 lg:text-2xl">Kategori 2</h3>
            </div>
          </a>
          <a href="#">
            <div className="mb-12 p-4 trasition duration-300 hover:scale-105">
              <div className="rounded-md shadow-md flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-primary mb-4">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-dark text-center text-xl mt-6 mb-3 lg:text-2xl">Kategori 3</h3>
            </div>
          </a>
          <a href="#">
            <div className="mb-12 p-4 trasition duration-300 hover:scale-105">
              <div className="rounded-md shadow-md flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-primary mb-4">
                  <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-dark text-center text-xl mt-6 mb-3 lg:text-2xl">Kategori 4</h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Kategori;
