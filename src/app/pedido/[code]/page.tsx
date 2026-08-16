import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { formatBRL, formatDate, pixPrice } from "@/lib/format";
import { site, whatsappFor } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = Promise<{ code: string }>;

export default async function PedidoPage({ params }: { params: Params }) {
  const { code } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.code, code.toUpperCase())).limit(1);
  if (!order) notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <div className="bg-neutral-50 py-14">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center">
          <p className="text-5xl">✅</p>
          <h1 className="mt-4 text-3xl font-black text-black">Pedido recebido!</h1>
          <p className="mt-2 text-neutral-600">
            Obrigado, {order.customerName.split(" ")[0]}! A PHONESMART já reservou seu aparelho.
          </p>
          <p className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-lg font-black tracking-widest text-orange-500">
            {order.code}
          </p>
          <p className="mt-3 text-sm text-neutral-500">
            Guarde este código para acompanhar o pedido em /acompanhar.
          </p>

          <a
            href={whatsappFor(`Olá PHONESMART! Acabei de fazer o pedido ${order.code} pelo site.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-black text-black"
          >
            Confirmar no WhatsApp
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="font-black text-black">Itens do pedido</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between border-b border-dashed border-neutral-200 pb-2">
                <span className="text-neutral-700">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-bold text-black">{formatBRL(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Total</span>
              <span className="font-black text-black">{formatBRL(order.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Total no PIX</span>
              <span className="font-black text-orange-600">{pixPrice(order.total)}</span>
            </div>
          </div>

          <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-neutral-500">Status</dt><dd className="font-bold text-black">{order.status}</dd></div>
            <div><dt className="text-neutral-500">Pagamento</dt><dd className="font-bold text-black">{order.paymentMethod}</dd></div>
            <div><dt className="text-neutral-500">Entrega</dt><dd className="font-bold text-black">{order.deliveryMethod}</dd></div>
            <div><dt className="text-neutral-500">Data</dt><dd className="font-bold text-black">{formatDate(order.createdAt)}</dd></div>
          </dl>

          <p className="mt-6 text-sm text-neutral-600">
            Retirada: {site.address} — {site.city}. Dúvidas? {site.phone}.
          </p>
          <Link href="/produtos" className="mt-4 inline-block font-bold text-orange-600 hover:underline">
            Continuar comprando →
          </Link>
        </div>
      </div>
    </div>
  );
}
