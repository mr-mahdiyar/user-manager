/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nationalCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "membershipDate" DATETIME NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "baseId" INTEGER NOT NULL,
    CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Base" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("baseId", "birthDate", "caseNumber", "family", "fatherName", "id", "membershipDate", "name", "nationalCode", "phone", "statusId") SELECT "baseId", "birthDate", "caseNumber", "family", "fatherName", "id", "membershipDate", "name", "nationalCode", "phone", "statusId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nationalCode_key" ON "User"("nationalCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
