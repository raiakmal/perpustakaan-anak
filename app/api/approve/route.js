import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id, isApproved, pustakawanId } = req.body;

    try {
      const updatedPeminjaman = await prisma.peminjaman.update({
        where: { id },
        data: {
          isApproved,
          pustakawanId: isApproved ? pustakawanId : null,
          status: isApproved ? 'Dipinjam' : 'Ditolak',
        },
      });
      res.status(200).json(updatedPeminjaman);
    } catch (error) {
      res.status(500).json({ error: 'Gagal memperbarui persetujuan peminjaman.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
