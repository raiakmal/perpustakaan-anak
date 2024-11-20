import prisma from '@/lib/prisma';

// Menampilkan data buku
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

// Menghapus data buku
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

// Menambahkan data buku
export async function POST(request) {
  try {
    const data = await request.json();
    const { judul, penulis, penerbit, tahunTerbit, kategori, stok, imagePath } = data;

    if (!judul || !penulis || !penerbit || !tahunTerbit || !kategori || stok == null || !imagePath) {
      return new Response(JSON.stringify({ error: 'Semua field harus diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
    console.error('Error saat menambahkan buku:', error);
    return new Response(JSON.stringify({ error: 'Gagal menambahkan buku', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
