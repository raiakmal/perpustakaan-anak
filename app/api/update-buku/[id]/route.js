import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Mendapatkan ID buku dan mengembalikan data buku berdasarkan ID
export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID buku tidak disertakan dalam permintaan' }, { status: 400 });
  }

  try {
    const buku = await prisma.buku.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!buku) {
      return NextResponse.json({ error: 'Buku tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(buku, { status: 200 });
  } catch (error) {
    console.error('Gagal mengambil data buku:', error);
    return NextResponse.json({ error: 'Gagal mengambil data buku' }, { status: 500 });
  }
}

// Update data buku berdasarkan ID
export async function PUT(req, { params }) {
  const { id } = params;

  // Validasi ID buku
  if (!id) {
    return NextResponse.json({ error: 'ID buku tidak disertakan dalam permintaan' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { judul, penulis, penerbit, tahunTerbit, kategori, stok, imagePath } = body;

    // Validasi data input
    if (!judul || !penulis || !penerbit || !tahunTerbit || !kategori || stok <= 0 || !imagePath) {
      return NextResponse.json({ error: 'Semua field harus diisi dengan benar' }, { status: 400 });
    }

    // Melakukan pembaruan data buku
    const updatedBuku = await prisma.buku.update({
      where: { id: parseInt(id, 10) },
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
    console.error('Gagal memperbarui buku:', error);
    return NextResponse.json({ error: 'Gagal memperbarui buku' }, { status: 500 });
  }
}
