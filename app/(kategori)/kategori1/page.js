import Link from 'next/link';

async function fetchBooksByCategory(kategori) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${kategori}`, {
    cache: 'no-store', // Hindari caching untuk data dinamis
  });
  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  return res.json();
}

export default async function Kategori1Page() {
  const books = await fetchBooksByCategory('Kategori 1');

  return (
    <div className="relative px-4 lg:px-0">
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-green-800">KATEGORI 1</h2>
          <div className="relative grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="p-4 transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105"
              >
                <div className="w-full h-48 mb-4 bg-gray-200"></div>
                <p className="mb-1 text-lg font-medium text-gray-700">{book.title}</p>
                <p className="mb-1 text-sm text-gray-700">Kategori: {book.category}</p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">stok: {book.stock}</p>
                  <Link
                    href={`/user/kategori1/detail/${book.id}`}
                    className={`px-4 py-2 text-white rounded-lg ${
                      book.stock === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {book.stock > 0 ? 'Pinjam' : 'Habis'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
