import { NextRequest, NextResponse } from "next/server";

export function checkAuth(req: NextRequest): NextResponse | null {
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");
  if (token !== password) {
    return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
  }

  return null;
}
