-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "pricePay" INTEGER NOT NULL,
    "mehtodPay" TEXT NOT NULL,
    "isPay" BOOLEAN NOT NULL,
    "activityId" INTEGER,
    "monthId" INTEGER,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_monthId_key" ON "Payments"("monthId");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE SET NULL ON UPDATE CASCADE;
