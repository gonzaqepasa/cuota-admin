// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getUserValidate } from "../../../../../services/user.service";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("user");
    const activity = searchParams.get("activity");

    const res = await getUserValidate({ name, activity });

    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
