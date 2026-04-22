import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { getContactInfo, saveContactInfo } from "@/lib/data-store";

export async function GET() {
  return NextResponse.json(getContactInfo());
}

export async function PUT(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const info = await req.json();
  saveContactInfo(info);

  return NextResponse.json(info);
}
