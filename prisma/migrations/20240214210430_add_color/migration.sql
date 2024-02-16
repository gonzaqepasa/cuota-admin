/*
  Warnings:

  - Added the required column `color` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "color" TEXT NOT NULL;
