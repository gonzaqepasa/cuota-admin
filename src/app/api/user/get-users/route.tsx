// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../../../../../services/user.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activity = searchParams.get("activity");
    const users = await getUsers({ nameActivity: String(activity) });

    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
