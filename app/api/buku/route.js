import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const buku = await prisma.buku.findMany();
    return new Response(JSON.stringify(buku), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching books' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID buku tidak disediakan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Menghapus buku berdasarkan ID
    await prisma.buku.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'Buku berhasil dihapus' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menghapus buku' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { judul, penulis, penerbit, tahunTerbit, kategori, stok, imagePath } = data;

    console.log('Data yang diterima:', { judul, penulis, penerbit, tahunTerbit, kategori, stok, imagePath });

    if (!judul || !penulis || !penerbit || !tahunTerbit || !kategori || stok == null || !imagePath) {
      return new Response(JSON.stringify({ error: 'Semua field harus diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Coba lakukan insert dan lihat hasilnya
    const buku = await prisma.buku.create({
      data: {
        judul,
        penulis,
        penerbit,
        tahunTerbit: parseInt(tahunTerbit, 10),
        kategori,
        stok: parseInt(stok, 10),
        imagePath,
      },
    });

    return new Response(JSON.stringify({ message: 'Buku berhasil ditambahkan', buku }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saat menambahkan buku:', error); // Periksa detail error dari Prisma
    return new Response(JSON.stringify({ error: 'Gagal menambahkan buku', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
