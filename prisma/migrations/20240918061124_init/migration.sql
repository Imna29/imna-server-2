-- CreateEnum
CREATE TYPE "WatchPlaylistItemType" AS ENUM ('MOVIE', 'TV_SHOW');

-- CreateEnum
CREATE TYPE "WatchPlaylistType" AS ENUM ('HISTORY', 'WATCH_LATER', 'FAVORITES', 'CUSTOM');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchPlaylist" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WatchPlaylistType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchPlaylistItem" (
    "id" UUID NOT NULL,
    "playlistId" UUID NOT NULL,
    "contentType" "WatchPlaylistItemType" NOT NULL,
    "contentId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchPlaylistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchedEpisode" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "tvShowId" INTEGER NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchedEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "WatchPlaylist_userId_idx" ON "WatchPlaylist"("userId");

-- CreateIndex
CREATE INDEX "WatchPlaylistItem_playlistId_idx" ON "WatchPlaylistItem"("playlistId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchPlaylistItem_playlistId_contentType_contentId_key" ON "WatchPlaylistItem"("playlistId", "contentType", "contentId");

-- CreateIndex
CREATE INDEX "WatchedEpisode_userId_tvShowId_idx" ON "WatchedEpisode"("userId", "tvShowId");

-- AddForeignKey
ALTER TABLE "WatchPlaylist" ADD CONSTRAINT "WatchPlaylist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchPlaylistItem" ADD CONSTRAINT "WatchPlaylistItem_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "WatchPlaylist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedEpisode" ADD CONSTRAINT "WatchedEpisode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
