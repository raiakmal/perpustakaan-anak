/*
  Warnings:

  - You are about to drop the column `siswaId` on the `Peminjaman` table. All the data in the column will be lost.
  - You are about to drop the `Siswa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kelas` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaSiswa` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Peminjaman" DROP CONSTRAINT "Peminjaman_siswaId_fkey";

-- AlterTable
ALTER TABLE "Peminjaman" DROP COLUMN "siswaId",
ADD COLUMN     "kelas" INTEGER NOT NULL,
ADD COLUMN     "namaSiswa" TEXT NOT NULL;

-- DropTable
DROP TABLE "Siswa";
