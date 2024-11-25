import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { kategori } = params;

  try {
    const buku = await prisma.buku.findMany({
      where: {
        kategori: kategori,
      },
    });

    return NextResponse.json(buku);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
