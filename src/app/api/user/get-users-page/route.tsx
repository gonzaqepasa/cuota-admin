// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import {
  getUsers,
  getUsersForPage,
} from "../../../../../services/user.service";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  try {
    if (!page) return NextResponse.error();
    console.log({ page: page });
    const users = await getUsersForPage({
      config: { page: Number(page), search: String(search) },
    });
    revalidatePath("/dashboard");
    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
