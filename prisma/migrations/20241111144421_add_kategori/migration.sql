/*
  Warnings:

  - You are about to drop the column `isbn` on the `Buku` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Buku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori` to the `Buku` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Buku_isbn_key";

-- AlterTable
ALTER TABLE "Buku" DROP COLUMN "isbn",
ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "kategori" TEXT NOT NULL;
