// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { createActivityService } from "../../../../../services/activity.service";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { color, price, nameActivity, modality } = await req.json();

    const activity = await createActivityService({
      color,
      price,
      modality,
      nameActivity,
      CreatedAt: "", //No necesita
      updatedAt: "", //No necesita
      description: "", //No necesita
      _id: "", //No necesita
    });
    console.log(activity);

    return NextResponse.json(activity);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
