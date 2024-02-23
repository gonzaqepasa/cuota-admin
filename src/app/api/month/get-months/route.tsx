// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getMonths } from "../../../../../services/month.service";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const monthName = searchParams.get("month");
    const isPay = searchParams.get("ispay") === "true" ? true : false;

    const months = await getMonths({ monthName: String(monthName), isPay });

    return NextResponse.json(months);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
