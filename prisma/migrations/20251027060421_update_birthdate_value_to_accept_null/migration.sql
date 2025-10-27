-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "nationalCode" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" DATETIME,
    "membershipDate" DATETIME,
    "caseNumber" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "baseId" INTEGER NOT NULL,
    CONSTRAINT "User_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Base" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("baseId", "birthDate", "caseNumber", "family", "fatherName", "membershipDate", "name", "nationalCode", "phone", "status") SELECT "baseId", "birthDate", "caseNumber", "family", "fatherName", "membershipDate", "name", "nationalCode", "phone", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nationalCode_key" ON "User"("nationalCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
