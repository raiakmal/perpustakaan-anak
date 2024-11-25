-- CreateTable
CREATE TABLE "Peminjaman" (
    "id" SERIAL NOT NULL,
    "bukuId" INTEGER NOT NULL,
    "siswaId" INTEGER NOT NULL,
    "pustakawanId" INTEGER NOT NULL,
    "tanggalPinjam" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalKembali" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "Buku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_pustakawanId_fkey" FOREIGN KEY ("pustakawanId") REFERENCES "Pustakawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
