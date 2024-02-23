// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { updateColorForActivitiesByName } from "../../../../../services/activity.service";
export const dynamic = 'force-dynamic'

export  async function PUT(req: NextRequest) {
  try {
    const { id, color, nameActivity } = await req.json();

    const activities = await updateColorForActivitiesByName(
      nameActivity,
      color
    );
    return NextResponse.json(activities);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
