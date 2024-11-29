import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { kategori } = params;

  try {
    // Ambil data buku berdasarkan kategori dari database
    const buku = await prisma.buku.findMany({
      where: {
        kategori: kategori, // Field kategori di database
      },
    });

    // Kembalikan hasil dalam format JSON
    return NextResponse.json(buku);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
