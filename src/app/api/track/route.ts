import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders, repairRequests } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = (searchParams.get("code") ?? "").trim().toUpperCase();
  if (!code) {
    return NextResponse.json({ error: "Informe um código." }, { status: 400 });
  }

  if (code.startsWith("OS-")) {
    const [repair] = await db
      .select()
      .from(repairRequests)
      .where(eq(repairRequests.protocol, code))
      .limit(1);
    if (!repair) return NextResponse.json({ error: "Protocolo não encontrado." }, { status: 404 });
    return NextResponse.json({ type: "repair", repair });
  }

  const [order] = await db.select().from(orders).where(eq(orders.code, code)).limit(1);
  if (!order) return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  return NextResponse.json({ type: "order", order, items });
}
