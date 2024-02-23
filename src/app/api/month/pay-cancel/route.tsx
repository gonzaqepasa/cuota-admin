// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { cancelPayMonth } from "../../../../../services/month.service";

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();

    const month = await cancelPayMonth({ id });

    return NextResponse.json(month);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
