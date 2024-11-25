/*
  Warnings:

  - Changed the type of `status` on the `Peminjaman` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Menunggu_Persetujuan', 'Disetujui', 'Ditolak');

-- AlterTable
ALTER TABLE "Peminjaman" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "kelas" SET DATA TYPE TEXT;
