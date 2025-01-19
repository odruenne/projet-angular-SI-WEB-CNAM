/*
  Warnings:

  - You are about to drop the `Croquettes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Utilisateurs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Croquettes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Utilisateurs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "mailAddress" TEXT NOT NULL,
    "postalAddress" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Kibble" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "taste" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "approvedByTokyo" BOOLEAN NOT NULL,
    "tokyoOpinion" TEXT,
    "humidity" INTEGER NOT NULL,
    "calcium" INTEGER NOT NULL,
    "rawAshes" INTEGER NOT NULL,
    "rawProteins" INTEGER NOT NULL,
    "rawFat" INTEGER NOT NULL,
    "rawFibers" INTEGER NOT NULL,
    "description" TEXT,
    "quantity" INTEGER
);
