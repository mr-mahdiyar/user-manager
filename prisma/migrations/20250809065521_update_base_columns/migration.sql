/*
  Warnings:

  - Added the required column `leader` to the `Base` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Base` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Base" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "leader" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Base" ("id", "name") SELECT "id", "name" FROM "Base";
DROP TABLE "Base";
ALTER TABLE "new_Base" RENAME TO "Base";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
