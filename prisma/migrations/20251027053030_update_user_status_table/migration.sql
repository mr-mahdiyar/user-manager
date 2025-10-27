/*
  Warnings:

  - You are about to drop the `UserStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `statusId` on the `User` table. All the data in the column will be lost.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserStatus";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "nationalCode" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "membershipDate" DATETIME,
    "caseNumber" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "baseId" INTEGER NOT NULL,
    CONSTRAINT "User_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Base" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("baseId", "birthDate", "caseNumber", "family", "fatherName", "membershipDate", "name", "nationalCode", "phone") SELECT "baseId", "birthDate", "caseNumber", "family", "fatherName", "membershipDate", "name", "nationalCode", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nationalCode_key" ON "User"("nationalCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
