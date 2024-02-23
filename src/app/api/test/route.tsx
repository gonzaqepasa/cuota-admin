// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const res = searchParams.getAll("nombre");

    return NextResponse.json({
      saludo: "Hola",
      res,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
