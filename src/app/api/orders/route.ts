import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { getProductsByIds } from "@/lib/products";

export const dynamic = "force-dynamic";

type IncomingItem = { id: number; quantity: number };

function generateCode() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `PS-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customerName?: string;
      customerPhone?: string;
      customerEmail?: string;
      city?: string;
      deliveryMethod?: string;
      paymentMethod?: string;
      note?: string;
      items?: IncomingItem[];
    };

    const items = (body.items ?? []).filter((item) => item.id && item.quantity > 0);
    if (!body.customerName || !body.customerPhone) {
      return NextResponse.json({ error: "Nome e telefone são obrigatórios." }, { status: 400 });
    }
    if (items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
    }

    const dbProducts = await getProductsByIds(items.map((item) => item.id));
    if (dbProducts.length === 0) {
      return NextResponse.json({ error: "Produtos não encontrados." }, { status: 400 });
    }

    const resolved = items
      .map((item) => {
        const product = dbProducts.find((entry) => entry.id === item.id);
        if (!product) return null;
        return {
          productId: product.id,
          name: `${product.name} ${product.storage} (${product.condition})`,
          unitPrice: product.price,
          quantity: Math.min(item.quantity, 10),
        };
      })
      .filter((value): value is NonNullable<typeof value> => value !== null);

    const total = resolved.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const code = generateCode();

    const [order] = await db
      .insert(orders)
      .values({
        code,
        customerName: body.customerName.slice(0, 120),
        customerPhone: body.customerPhone.slice(0, 40),
        customerEmail: (body.customerEmail ?? "").slice(0, 160),
        city: (body.city ?? "").slice(0, 120),
        deliveryMethod: body.deliveryMethod ?? "retirada",
        paymentMethod: body.paymentMethod ?? "pix",
        note: body.note ?? "",
        total,
      })
      .returning();

    await db.insert(orderItems).values(resolved.map((item) => ({ ...item, orderId: order.id })));

    return NextResponse.json({ code: order.code, total: order.total }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível criar o pedido." }, { status: 500 });
  }
}
