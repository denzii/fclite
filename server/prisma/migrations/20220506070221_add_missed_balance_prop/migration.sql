/*
  Warnings:

  - Added the required column `balance` to the `shareholders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shareholders" ADD COLUMN     "balance" INTEGER NOT NULL;
