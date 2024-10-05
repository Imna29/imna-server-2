/*
  Warnings:

  - You are about to drop the column `addedAt` on the `WatchPlaylistItem` table. All the data in the column will be lost.
  - Added the required column `watchedAt` to the `WatchPlaylistItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchPlaylist" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "WatchPlaylistItem" DROP COLUMN "addedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "watchedAt" TIMESTAMP(3) NOT NULL;
