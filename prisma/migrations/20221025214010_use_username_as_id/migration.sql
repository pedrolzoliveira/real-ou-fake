/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Tweet` table. All the data in the column will be lost.
  - Added the required column `username` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_authorId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("username");

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "authorId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_username_fkey" FOREIGN KEY ("username") REFERENCES "Author"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
