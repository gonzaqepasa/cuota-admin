// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { createActivityService } from "../../../../../services/activity.service";
import { revalidatePath } from "next/cache";

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
    const path = req.nextUrl.searchParams.get("path") || "/";
    console.log(path);
    revalidatePath(path);
    return NextResponse.json(activity);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
