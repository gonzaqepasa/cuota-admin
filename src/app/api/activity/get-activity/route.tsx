// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getActivityService } from "../../../../../services/activity.service";

export async function GET(req: NextRequest) {
  try {
    const { nameActivity } = await req.json();

    const activities = await getActivityService({
      nameActivity: String(nameActivity),
    });

    return NextResponse.json(activities);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
