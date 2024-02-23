// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getActivityService } from "../../../../../services/activity.service";
export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const nameActivity = searchParams.get("nameActivity");
    const activities = await getActivityService({
      nameActivity: String(nameActivity),
    });

    return NextResponse.json(activities);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
