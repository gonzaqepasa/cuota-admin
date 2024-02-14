-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_activityId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
