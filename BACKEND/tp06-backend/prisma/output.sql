PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('09938321-0209-4486-829b-c13e2cd39167','6b6fd11a431315455d01df95dabd2ebb91d6266ce70b29d72899680c82a8f851',1736885910289,'20250114201830_init',NULL,NULL,1736885910281,1);
INSERT INTO _prisma_migrations VALUES('077d3173-8807-4f50-9192-46ea1c2559fc','c622f41d122fb915eaf3dc1cbaf4e5c33a8eb96d80c431ff3443e64dd6dc1884',1737030042440,'20250116122042_add_description_to_croquettes',NULL,NULL,1737030042420,1);
INSERT INTO _prisma_migrations VALUES('2da13a21-ff02-488e-92ce-6b48a37c2385','97193f34d0038c47ac8da1fa262bd706e2943385c79bac202b9a4f9907281e14',1737152512914,'20250117222152_add_quantite_to_croquettes',NULL,NULL,1737152512892,1);
CREATE TABLE IF NOT EXISTS "Utilisateurs" (
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
INSERT INTO Utilisateurs VALUES(2,'toto67','$2a$10$wotCG3cP735CQLhV5IS7aOA5FrlfWmrvnbgi7BSgOFUgyLWJsB6dO','Bichette','Tokyo TEST','tokyo67@gmail.com','6 rue des croquettes','67400','Meow-Graffenstaden','France');
INSERT INTO Utilisateurs VALUES(6,'jppHelp','$2b$10$vPR533iCyD2cBySqoZzvu.3ocD6bQePyASr7X/cN5U2/eC5uDKA1S','jpp','jpp','jpp@gmail.com','6 rue de jpp','87452','JPPHELP','France');
INSERT INTO Utilisateurs VALUES(7,'test12','$2b$10$M0kzAbtOJTilqc/kpdcZHO3l3ahm5w2y69RPjn26.Mf4goYrykx.K','vggfgf','fgfgf','fdfdsfd@gmail.com','fdiofdi','58742','Ahhhh','France');
INSERT INTO Utilisateurs VALUES(8,'bichette','$2b$10$0TIb2mlTQFLLybArJQUiGeY0dPqZx3mPMihcps4nYFwd.rZ/TJ7bG','Bichette','Tokyo','totobichette@gmail.com','test test','58742','Bichette City','Japon');
INSERT INTO Utilisateurs VALUES(9,'test89','$2b$10$B2/6NJ4VFTYNaFy65EcO4.hpRBy/M4h6nYoPJYA2HQGNq6YnUmdn2','Druenne','Tokyo','toutou@gmail.com','fdkofdi','85842','Meow-Graffenstaden','France');
INSERT INTO Utilisateurs VALUES(10,'test55','$2b$10$5p.y9/wfNUDkpgNiWj4Wy.EUvujX4TzAJLBijOn0apvfB3ApzkxJa','hhhhhh','hhhhhh','hhhhh@gmail.com','6 rue des croquettes','89785','ddd','Test');
INSERT INTO Utilisateurs VALUES(11,'totolechat','$2b$10$qnCkvUtjQ6F0ihenWPdQ8ukuniQMftEEZbqp7urIr1K1Ddnc4JUxK','Bichette','Tokyo','tokyoMiaou@gmail.com','6 rue des croquettes','67400','Illkirch-Meowstaden','France');
INSERT INTO Utilisateurs VALUES(12,'toutou','$2b$10$gCfvMa9zTIvSXEASEUDUmuMS50JQSqHn0xT9yAq1B6gyPBbkTZZ2G','Noir','Chat','chatnoir@gmail.com','5 rue des bichettes','50140','Villechien','France');
INSERT INTO Utilisateurs VALUES(13,'ab','$2a$10$4fR5wBZgEdaTfWutwSOz.eQ7ZfY5PVs4JeJm9PIi9Mtq6lDop3GmO','a','a','a@a.fra','a','67000','a','a');
INSERT INTO Utilisateurs VALUES(14,'miaou','$2a$10$xDpbacdFOSP/UKl11zVJQ.bm1kbGYWu9/SFJearTAlWF1CV2u2u22','Bichette','Tokyo','tokyo67@gmail.com','6 rue des croquettes','67400','Meow-Graffenstaden','France');
CREATE TABLE IF NOT EXISTS "Croquettes" (
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
, "description" TEXT, "quantite" INTEGER);
INSERT INTO Kibble VALUES(1,'Purina One Kibbles',25.0,'Chicken','https://media.zooplus.com/bilder/6/400/07613038195148_h1n1_01_fr_44166443_6.jpg',1,'Vive ces croquettes ! Miam miam',8,2,3,32,15,4,'Délicieuses et nourrissantes, ces croquettes sont bien mieux que la pâtée !',6);
INSERT INTO Kibble VALUES(2,'Hills Kibbles',30.0,'Tuna','https://www.easypara.com/media/catalog/product/4/0/40788.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',0,NULL,10,2,4,30,12,5,'Croquettes au thon de qualité supérieure, idéales pour les chats gourmets.',12);
INSERT INTO Kibble VALUES(3,'Almo Nature Kibbles',36.0,'Beef','https://cdn.webshopapp.com/shops/275040/files/450603970/1000x1000x2/almo-nature-almo-nature-sterilised-dry-food-cat-40.jpg',1,'Almo, la marque de référence pour mon bidou ! Elle est la meilleure marque du marché !',12,3,5,28,13,4,'Almo Nature, la meilleure option pour les chats sensibles et exigeants.',4);
INSERT INTO Kibble VALUES(4,'Meow Kibbles',10.0,'Trout','https://media.auchan.fr/A0220140130000632619PRIMARY_2048x2048/B2CD/',1,'Pas mal pour le prix.',9,2,3,25,10,3,'Croquettes à la truite de qualité, pour les chats qui aiment le goût léger.',2);
INSERT INTO Kibble VALUES(5,'Ultima Kibbles',41.0,'Chicken','https://media.auchan.fr/A0220110119000242941PRIMARY_2048x2048/B2CD/',1,'Je ne supporte pas le poulet, mais pour le coup, ces croquettes sont très bonnes !',10,4,5,35,18,6,'Croquettes au poulet, parfaites pour les chats ayant des préférences gustatives simples.',1);
INSERT INTO Kibble VALUES(6,'Brekkies Kibbles',13.0,'Chicken','https://www.cdiscount.com/pdt2/7/1/0/1/700x700/bre1688052117710/rw/croquette-pour-chat-au-poulet-sterilise-brekkies.jpg',0,NULL,7,2,2,20,8,3,'Croquettes au poulet stérilisées, idéales pour les chats stérilisés.',16);
INSERT INTO Kibble VALUES(7,'Pro Kibbles',29.0,'Turkey','https://www.pro-nutrition.fr/2912-home_default/pure-life-chat-adult-dinde-croquettes-sans-cereales-pour-chat-a-la-dinde.jpg',1,'Cette dinde a bien meilleur goût que la madame qui prend soin de moi tous les jours et qui se fait appeler Maman Tokyo !!',11,3,4,33,15,5,'Croquettes à la dinde sans céréales, pour un goût savoureux et une meilleure digestion.',7);
INSERT INTO Kibble VALUES(8,'Wagyu Beef Kibbles',57.0,'Beef','https://www.sallyetcie.com/wp-content/uploads/30-GR-Coeur-Boeuf-Wagyu-hache.png',1,'Vous devez acheter ces croquettes. Tous les chats aiment le boeuf de Wagyu !',12,5,6,40,20,7,'Croquettes de boeuf Wagyu, un vrai délice pour votre chat avec une saveur inégalée.',8);
INSERT INTO Kibble VALUES(9,'Pro Kibbles',24.0,'Duck','https://www.everland-petfood.com/wp-content/uploads/2020/11/3D_sterilised_cat_duck_4kg_RVB_BD.png',0,NULL,8,2,3,28,14,4,'Croquettes au canard stérilisé, adaptées aux chats sensibles et au goût raffiné.',4);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Kibbles',9);
INSERT INTO sqlite_sequence VALUES('Utilisateurs',14);
COMMIT;
