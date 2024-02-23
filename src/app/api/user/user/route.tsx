// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../../../services/user.service";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("USER");
    console.log(id);
    const user = await getUser({ id });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
