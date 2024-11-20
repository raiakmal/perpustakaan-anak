import prisma from '@/lib/prisma';

// Menampilkan data pustakawan
export async function GET(request) {
  try {
    const pustakawan = await prisma.pustakawan.findMany();
    return new Response(JSON.stringify(pustakawan), {
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

// Menghapus data pustakawan
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID pustakawn tidak disediakan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.pustakawan.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'Pustakawan berhasil dihapus' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menghapus Pustakawan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Menambahkan data pustakawan
export async function POST(request) {
  try {
    const data = await request.json();
    const { nama, email, noHp } = data;

    if (!nama || !email || !noHp) {
      return new Response(JSON.stringify({ error: 'Semua field harus diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Email tidak valid' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pustakawan = await prisma.pustakawan.create({
      data: {
        nama,
        email,
        noHp,
      },
    });

    return new Response(JSON.stringify({ message: 'Pustakawan berhasil ditambahkan', pustakawan }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saat menambahkan Pustakawan:', error);
    return new Response(
      JSON.stringify({
        error: 'Gagal menambahkan Pustakawan',
        details: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
