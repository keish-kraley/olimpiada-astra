import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { getLogos, saveLogos } from "@/lib/data-store";

export async function GET() {
  return NextResponse.json(getLogos());
}

export async function PUT(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const logos = await req.json();
  saveLogos(logos);

  return NextResponse.json(logos);
}
