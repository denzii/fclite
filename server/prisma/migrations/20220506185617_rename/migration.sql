/*
  Warnings:

  - You are about to drop the column `email` on the `shareholders` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `shareholders` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `shareholders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shareholders" DROP CONSTRAINT "fk_movie";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "fk_movie";

-- DropIndex
DROP INDEX "shareholders_email_key";

-- AlterTable
ALTER TABLE "shareholders" DROP COLUMN "email",
DROP COLUMN "movie_id",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "movie_id",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "shareholders" ADD CONSTRAINT "fk_movie" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "fk_movie" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
