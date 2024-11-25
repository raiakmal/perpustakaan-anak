/*
  Warnings:

  - Changed the type of `kelas` on the `Peminjaman` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Peminjaman" DROP COLUMN "kelas",
ADD COLUMN     "kelas" INTEGER NOT NULL;
