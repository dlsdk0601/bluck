import { NextRequest, NextResponse } from "next/server";
import { getHash } from "@/ex/bcryptEx";

export async function POST(req: NextRequest) {
  console.log(req.body);
  const password = await getHash("1234");
  return NextResponse.json({ a: "1", b: 2, c: [1, 2, 3, 4], d: password });
}
