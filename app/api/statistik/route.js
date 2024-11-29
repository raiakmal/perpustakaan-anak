import prisma from '@/lib/prisma';

export async function GET(req) {
  try {
    const bukuBaru = await prisma.buku.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Buku baru dalam 30 hari terakhir
        },
      },
    });

    const bukuDipinjam = await prisma.peminjaman.count();

    const bukuTersedia = await prisma.buku.aggregate({
      _sum: {
        stok: true,
      },
    });

    return new Response(
      JSON.stringify({
        bukuBaru,
        bukuDipinjam,
        bukuTersedia: bukuTersedia._sum.stok || 0,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}
