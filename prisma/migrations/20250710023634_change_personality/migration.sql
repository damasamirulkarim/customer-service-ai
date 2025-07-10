/*
  Warnings:

  - You are about to drop the column `communication_style` on the `agents` table. All the data in the column will be lost.
  - Made the column `personality` on table `agents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agents" DROP COLUMN "communication_style",
ALTER COLUMN "personality" SET NOT NULL,
ALTER COLUMN "personality" SET DEFAULT 'professional';
