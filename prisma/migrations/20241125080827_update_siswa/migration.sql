/*
  Warnings:

  - You are about to drop the column `kelas` on the `Siswa` table. All the data in the column will be lost.
  - You are about to drop the column `nomorInduk` on the `Siswa` table. All the data in the column will be lost.
  - Added the required column `alamat` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noHp` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Siswa_nomorInduk_key";

-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "kelas",
DROP COLUMN "nomorInduk",
ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "noHp" TEXT NOT NULL;
