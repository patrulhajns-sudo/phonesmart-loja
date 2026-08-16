import { NextResponse } from "next/server";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const items = await listProducts({
    brand: searchParams.get("brand") ?? undefined,
    condition: searchParams.get("condition") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
  });
  return NextResponse.json({ total: items.length, items });
}
