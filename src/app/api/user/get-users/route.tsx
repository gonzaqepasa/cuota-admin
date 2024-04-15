// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../../../../../services/user.service";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const users = await getUsers();
    revalidatePath("/dashboard");
    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
