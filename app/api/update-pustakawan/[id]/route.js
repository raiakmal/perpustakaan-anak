import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Mendapatkan ID pustakawan dan mengembalikan data pustakawan berdasarkan ID
export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID Pustakawan tidak disertakan dalam permintaan' }, { status: 400 });
  }

  try {
    const pustakawan = await prisma.pustakawan.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!pustakawan) {
      return NextResponse.json({ error: 'Pustakawan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(pustakawan, { status: 200 });
  } catch (error) {
    console.error('Gagal mengambil data Pustakawan:', error);
    return NextResponse.json({ error: 'Gagal mengambil data Pustakawan' }, { status: 500 });
  }
}

// Update data pustakawan berdasarkan ID
export async function PUT(req, { params }) {
  const { id } = params;

  // Validasi ID pustakawan
  if (!id) {
    return NextResponse.json({ error: 'ID Pustakawan tidak disertakan dalam permintaan' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { nama, email, noHp } = body;

    // Validasi data input
    if (!nama || !email || !noHp) {
      return NextResponse.json({ error: 'Semua field harus diisi dengan benar' }, { status: 400 });
    }

    // Melakukan pembaruan data pustakawan
    const updatedPustakawan = await prisma.pustakawan.update({
      where: { id: parseInt(id, 10) },
      data: {
        nama,
        email,
        noHp,
      },
    });

    return NextResponse.json({ message: 'Pustakawan berhasil diperbarui', data: updatedPustakawan }, { status: 200 });
  } catch (error) {
    console.error('Gagal memperbarui Pustakawan:', error);
    return NextResponse.json({ error: 'Gagal memperbarui Pustakawan' }, { status: 500 });
  }
}
