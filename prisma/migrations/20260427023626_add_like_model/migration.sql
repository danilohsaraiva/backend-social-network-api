-- CreateTable
CREATE TABLE "Like" (
    "likeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("likeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_tweetId_key" ON "Like"("userId", "tweetId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id_tweet") ON DELETE RESTRICT ON UPDATE CASCADE;
