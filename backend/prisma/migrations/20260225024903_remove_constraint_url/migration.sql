/*
  Warnings:

  - Made the column `url_callback` on table `Aluno` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "url_callback" SET NOT NULL;
