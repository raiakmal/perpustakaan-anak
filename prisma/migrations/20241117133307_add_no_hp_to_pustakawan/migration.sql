/*
  Warnings:

  - Added the required column `noHp` to the `Pustakawan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pustakawan" ADD COLUMN     "noHp" TEXT NOT NULL;
