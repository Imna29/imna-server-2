/*
  Warnings:

  - A unique constraint covering the columns `[userId,tvShowId,seasonNum,episodeNum]` on the table `WatchedEpisode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchedEpisode_userId_tvShowId_seasonNum_episodeNum_key" ON "WatchedEpisode"("userId", "tvShowId", "seasonNum", "episodeNum");
