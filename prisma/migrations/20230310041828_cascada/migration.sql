-- DropForeignKey
ALTER TABLE "Month" DROP CONSTRAINT "Month_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_activityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_calendarId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Month" ADD CONSTRAINT "Month_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
