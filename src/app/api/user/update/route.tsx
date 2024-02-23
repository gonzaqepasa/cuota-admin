// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { updateUser } from "../../../../../services/user.service";

export async function PUT(req: NextRequest) {
  try {
    const { userId, phoneNumber, description, name } = await req.json();
    const user = await updateUser({ userId, phoneNumber, description, name });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
