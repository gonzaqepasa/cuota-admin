// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { payMonth } from "../../../../../services/month.service";

export async function POST(req: NextRequest) {
  try {
    const {
      trainer,
      method,
      pricePay,
      activity,
      monthName,
      paymentDate,
      user,
      description,
    } = await req.json();

    const month = await payMonth({
      trainer,
      pricePay,
      activity,
      method,
      monthName,
      paymentDate,
      user,
      description,
    });

    return NextResponse.json(month);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
