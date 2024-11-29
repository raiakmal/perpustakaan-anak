import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Fungsi untuk memvalidasi ID
function validateId(id) {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId) || parsedId <= 0) {
    throw new Error('ID buku tidak valid');
  }
  return parsedId;
}

// Endpoint untuk mendapatkan data buku berdasarkan ID
export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Validasi ID
    const bookId = validateId(id);

    const buku = await prisma.buku.findUnique({
      where: { id: bookId },
    });

    if (!buku) {
      return NextResponse.json({ error: 'Buku tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(buku, { status: 200 });
  } catch (error) {
    console.error('Gagal mengambil data buku:', error.message);
    return NextResponse.json(
      { error: error.message || 'Gagal mengambil data buku' },
      { status: error.message === 'ID buku tidak valid' ? 400 : 500 }
    );
  }
}

// Endpoint untuk memperbarui data buku berdasarkan ID
export async function PUT(req, { params }) {
  try {
    const { id } = params;

    // Validasi ID
    const bookId = validateId(id);

    // Ambil dan validasi body request
    const body = await req.json();
    const { judul, penulis, penerbit, tahunTerbit, kategori, stok, imagePath } = body;

    if (
      !judul ||
      !penulis ||
      !penerbit ||
      !tahunTerbit ||
      !kategori ||
      stok === undefined ||
      stok <= 0 ||
      !imagePath
    ) {
      return NextResponse.json({ error: 'Semua field harus diisi dengan benar' }, { status: 400 });
    }

    // Perbarui data buku di database
    const updatedBuku = await prisma.buku.update({
      where: { id: bookId },
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

    return NextResponse.json({ message: 'Buku berhasil diperbarui', data: updatedBuku }, { status: 200 });
  } catch (error) {
    console.error('Gagal memperbarui buku:', error.message);
    return NextResponse.json(
      { error: error.message || 'Gagal memperbarui buku' },
      { status: error.message === 'ID buku tidak valid' ? 400 : 500 }
    );
  }
}
