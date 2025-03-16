/*
  Warnings:

  - Added the required column `expensecategory` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expensename` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "expensecategory" VARCHAR(50) NOT NULL,
ADD COLUMN     "expensename" VARCHAR(50) NOT NULL;
