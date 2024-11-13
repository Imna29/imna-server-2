-- CreateEnum
CREATE TYPE "GptMessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateTable
CREATE TABLE "GptConversation" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GptConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GptMessage" (
    "id" UUID NOT NULL,
    "conversationId" UUID NOT NULL,
    "role" "GptMessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GptMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GptConversation" ADD CONSTRAINT "GptConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GptMessage" ADD CONSTRAINT "GptMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "GptConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
