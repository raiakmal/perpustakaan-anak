/*
  Warnings:

  - Made the column `tanggalKembali` on table `Peminjaman` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Peminjaman" DROP CONSTRAINT "Peminjaman_pustakawanId_fkey";

-- AlterTable
ALTER TABLE "Peminjaman" ALTER COLUMN "pustakawanId" DROP NOT NULL,
ALTER COLUMN "tanggalKembali" SET NOT NULL,
ALTER COLUMN "kelas" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_pustakawanId_fkey" FOREIGN KEY ("pustakawanId") REFERENCES "Pustakawan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
