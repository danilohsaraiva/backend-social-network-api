/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Example";

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_nick_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id_follow" TEXT NOT NULL,
    "fk_follower" TEXT NOT NULL,
    "fk_following" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id_follow")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id_tweet" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fk_parent" TEXT,
    "fk_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id_tweet")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_nick_name_key" ON "User"("user_nick_name");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_fk_follower_fk_following_key" ON "Follow"("fk_follower", "fk_following");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_fk_follower_fkey" FOREIGN KEY ("fk_follower") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_fk_following_fkey" FOREIGN KEY ("fk_following") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_fk_parent_fkey" FOREIGN KEY ("fk_parent") REFERENCES "Tweet"("id_tweet") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
