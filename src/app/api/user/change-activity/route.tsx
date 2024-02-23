// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { changeActivityService } from "../../../../../services/user.service";

export async function PUT(req: NextRequest) {
  try {
    const { id_user, id_activity } = await req.json();

    const data = await changeActivityService({
      userId: id_user,
      newActivityId: id_activity,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
