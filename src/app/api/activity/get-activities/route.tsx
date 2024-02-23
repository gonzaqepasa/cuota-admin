// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getActivitiesToDashboard } from "../../../../../services/activity.service";
import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const activities = await getActivitiesToDashboard();

    revalidatePath("/dashboard");
    
    return NextResponse.json(activities);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
