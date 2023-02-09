-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "description" TEXT,
    "active" BOOLEAN NOT NULL,
    "activityId" INTEGER NOT NULL,
    "calendarId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "nameActivity" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendar" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Month" (
    "id" SERIAL NOT NULL,
    "monthNum" INTEGER NOT NULL,
    "monthName" TEXT NOT NULL,
    "addData" TEXT NOT NULL,
    "addAdmin" TEXT NOT NULL,
    "comment" TEXT,
    "isPay" BOOLEAN NOT NULL,
    "mothodPay" TEXT NOT NULL,
    "pricePay" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Month_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_calendarId_key" ON "User"("calendarId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Month" ADD CONSTRAINT "Month_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
