// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getUsersByActivityId } from "../../../../../services/user.service";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activityIds = searchParams.get("activityIds");
    const nameActivity = searchParams.get("nameActivity");
    const activityIdsArray =
      typeof activityIds === "string"
        ? activityIds.split(",").map((id) => id.trim())
        : [];
    const users = await getUsersByActivityId({ activityIds: activityIdsArray });
    console.log("Array de activity ids", activityIds);
    revalidatePath(`/activity/${nameActivity}`);

    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
