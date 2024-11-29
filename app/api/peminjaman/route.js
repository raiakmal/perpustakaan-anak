import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Status Peminjaman
const STATUS = {
  MENUNGGU: 'Menunggu_Persetujuan',
  DISETUJUI: 'Disetujui',
  DITOLAK: 'Ditolak',
};

// Mendapatkan daftar peminjaman
export async function GET(req) {
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      include: {
        Buku: { select: { id: true, judul: true } },
        Pustakawan: { select: { id: true, nama: true, email: true, noHp: true } },
      },
    });

    if (!peminjaman.length) {
      return NextResponse.json({ message: 'Belum ada data peminjaman' }, { status: 200 });
    }

    return NextResponse.json(peminjaman, { status: 200 });
  } catch (error) {
    console.error('Error fetching peminjaman:', error);
    return NextResponse.json({ error: 'Gagal memuat data peminjaman' }, { status: 500 });
  }
}

// Membuat peminjaman baru
export async function POST(req) {
  try {
    const body = await req.json();
    const { bukuId, namaSiswa, kelas, tanggalKembali, email, noHp } = body;

    // Validasi input
    if (!bukuId || !namaSiswa || !kelas || !tanggalKembali || !email || !noHp) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Email tidak valid' }, { status: 400 });
    }

    if (!/^[0-9]{10,13}$/.test(noHp)) {
      return NextResponse.json({ error: 'Nomor telepon tidak valid' }, { status: 400 });
    }

    if (isNaN(new Date(tanggalKembali).getTime())) {
      return NextResponse.json({ error: 'Tanggal kembali tidak valid' }, { status: 400 });
    }

    const buku = await prisma.buku.findUnique({ where: { id: bukuId } });
    if (!buku || buku.stok <= 0) {
      return NextResponse.json({ error: 'Buku tidak tersedia' }, { status: 400 });
    }

    const peminjaman = await prisma.$transaction([
      prisma.buku.update({
        where: { id: bukuId },
        data: { stok: { decrement: 1 } },
      }),
      prisma.peminjaman.create({
        data: {
          bukuId,
          namaSiswa,
          kelas,
          email,
          noHp,
          tanggalKembali: new Date(tanggalKembali),
          status: STATUS.MENUNGGU,
        },
      }),
    ]);

    return NextResponse.json(peminjaman[1], { status: 201 });
  } catch (error) {
    console.error('Error creating peminjaman:', error);
    return NextResponse.json({ error: 'Gagal membuat peminjaman' }, { status: 500 });
  }
}

// Memperbarui status peminjaman
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, status, pustakawanId } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID dan status peminjaman diperlukan' }, { status: 400 });
    }

    const validStatuses = [STATUS.MENUNGGU, STATUS.DISETUJUI, STATUS.DITOLAK];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
    }

    const peminjaman = await prisma.peminjaman.findUnique({ where: { id } });
    if (!peminjaman) {
      return NextResponse.json({ error: 'Peminjaman tidak ditemukan' }, { status: 404 });
    }

    if (peminjaman.status !== STATUS.MENUNGGU) {
      return NextResponse.json({ error: 'Peminjaman sudah memiliki status final' }, { status: 400 });
    }

    const updatedPeminjaman = await prisma.$transaction(async (prisma) => {
      const updated = await prisma.peminjaman.update({
        where: { id },
        data: { status, pustakawanId },
      });

      if (status === STATUS.DITOLAK) {
        await prisma.buku.update({
          where: { id: peminjaman.bukuId },
          data: { stok: { increment: 1 } },
        });
      }

      return updated;
    });

    return NextResponse.json(updatedPeminjaman, { status: 200 });
  } catch (error) {
    console.error('Error updating peminjaman:', error);
    return NextResponse.json({ error: 'Gagal memperbarui peminjaman' }, { status: 500 });
  }
}

// Menghapus data peminjaman
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID peminjaman diperlukan' }, { status: 400 });
    }

    const peminjaman = await prisma.peminjaman.findUnique({ where: { id } });
    if (!peminjaman) {
      return NextResponse.json({ error: 'Peminjaman tidak ditemukan' }, { status: 404 });
    }

    if (peminjaman.status === STATUS.DISETUJUI) {
      return NextResponse.json({ error: 'Peminjaman yang disetujui tidak dapat dihapus' }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.buku.update({
        where: { id: peminjaman.bukuId },
        data: { stok: { increment: 1 } },
      }),
      prisma.peminjaman.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json({ message: 'Peminjaman berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting peminjaman:', error);
    return NextResponse.json({ error: 'Gagal menghapus peminjaman' }, { status: 500 });
  }
}
