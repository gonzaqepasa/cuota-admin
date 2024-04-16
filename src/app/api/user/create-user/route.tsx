import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../../../services/user.service";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export async function POST(req: NextRequest) {
  try {
    const { name, phoneNumber, description } = await req.json();

    const user = await createUser({
      name,
      phoneNumber,
      description,
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
