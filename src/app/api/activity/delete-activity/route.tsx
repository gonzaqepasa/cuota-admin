// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { deleteActivityService } from "../../../../../services/activity.service";
export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");
    const activity = await deleteActivityService({ _id });

    return NextResponse.json(activity);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
