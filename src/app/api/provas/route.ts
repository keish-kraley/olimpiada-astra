import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { getProvas, saveProvas, ProvaItem } from "@/lib/data-store";

export async function GET() {
  return NextResponse.json(getProvas());
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const item: ProvaItem = await req.json();
  const items = getProvas();
  item.id = item.id || `${item.category[0]}${Date.now()}`;
  items.push(item);
  saveProvas(items);

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const updated: ProvaItem = await req.json();
  const items = getProvas();
  const idx = items.findIndex((i) => i.id === updated.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }
  items[idx] = updated;
  saveProvas(items);

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const { id } = await req.json();
  const items = getProvas().filter((i) => i.id !== id);
  saveProvas(items);

  return NextResponse.json({ success: true });
}
