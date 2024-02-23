// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { deleteUser } from "../../../../../services/user.service";

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();

    const user = await deleteUser({ userId: id });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
