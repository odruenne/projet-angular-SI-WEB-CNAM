-- CreateTable
CREATE TABLE "Utilisateurs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresseMail" TEXT NOT NULL,
    "adressePostale" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "pays" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Croquettes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prix" REAL NOT NULL,
    "gout" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "approuveeParTokyo" BOOLEAN NOT NULL,
    "avisTokyo" TEXT,
    "humidite" INTEGER NOT NULL,
    "calcium" INTEGER NOT NULL,
    "cendresBrutes" INTEGER NOT NULL,
    "proteinesBrutes" INTEGER NOT NULL,
    "matieresGrassesBrutes" INTEGER NOT NULL,
    "fibresBrutes" INTEGER NOT NULL
);
