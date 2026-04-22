import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import {
  getGalleryEvents,
  saveGalleryEvents,
  GalleryEvent,
} from "@/lib/data-store";

export async function GET() {
  return NextResponse.json(getGalleryEvents());
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const event: GalleryEvent = await req.json();
  const events = getGalleryEvents();

  if (events.some((e) => e.slug === event.slug)) {
    return NextResponse.json(
      { error: "Slug já existe" },
      { status: 400 }
    );
  }

  events.push(event);
  saveGalleryEvents(events);

  return NextResponse.json(event, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const updated: GalleryEvent = await req.json();
  const events = getGalleryEvents();
  const idx = events.findIndex((e) => e.slug === updated.slug);
  if (idx === -1) {
    return NextResponse.json(
      { error: "Evento não encontrado" },
      { status: 404 }
    );
  }
  events[idx] = updated;
  saveGalleryEvents(events);

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const { slug } = await req.json();
  const events = getGalleryEvents().filter((e) => e.slug !== slug);
  saveGalleryEvents(events);

  return NextResponse.json({ success: true });
}
