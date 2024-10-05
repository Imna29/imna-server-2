/*
  Warnings:

  - Added the required column `episodeNum` to the `WatchedEpisode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonNum` to the `WatchedEpisode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchedEpisode" ADD COLUMN     "episodeNum" INTEGER NOT NULL,
ADD COLUMN     "seasonNum" INTEGER NOT NULL;
