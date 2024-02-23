// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { editActivity } from "../../../../../services/activity.service";

export async function PUT(req: NextRequest) {
  try {
    const {
      _id,
      color,
      nameActivity,
      price,
      description,
      modality,
      CreatedAt,
      updatedAt,
    } = await req.json();

    const activities = await editActivity({
      _id,
      color,
      nameActivity,
      price,
      description,
      modality,
      CreatedAt,
      updatedAt,
    });

    return NextResponse.json(activities);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
