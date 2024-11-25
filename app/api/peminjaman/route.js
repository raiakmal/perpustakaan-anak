import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Ambil data peminjaman dari database
      const peminjaman = await prisma.peminjaman.findMany({
        include: {
          buku: true, // Pastikan buku juga di-include dalam query
        },
      });
      console.log("Data Peminjaman:", peminjaman);
      return res.status(200).json(peminjaman);
    } catch (error) {
      console.error('Error fetching peminjaman:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
