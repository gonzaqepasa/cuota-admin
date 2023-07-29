-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "addAdmin" TEXT,
ADD COLUMN     "addData" TEXT,
ALTER COLUMN "pricePay" DROP NOT NULL,
ALTER COLUMN "methodPay" DROP NOT NULL;
