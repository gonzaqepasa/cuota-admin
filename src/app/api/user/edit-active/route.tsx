// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, active } = await req.json();

    // const user = await editActive({ id, active });
    return NextResponse.json(id);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
