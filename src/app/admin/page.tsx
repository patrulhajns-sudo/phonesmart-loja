import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { AdminLogin } from "@/app/admin/AdminLogin";
import { logoutAction } from "@/app/admin/actions";
import { db } from "@/db";
import { orderItems, orders, products, repairRequests } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/auth";
import { formatBRL, formatDate } from "@/lib/format";
import { ensureSeeded } from "@/lib/products";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const orderStatuses = ["novo", "confirmado", "separado", "entregue", "cancelado"];
const repairStatuses = ["aguardando", "em análise", "orçado", "em reparo", "pronto", "entregue"];

async function updateOrderStatus(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!id || !status) return;
  await db.update(orders).set({ status }).where(eq(orders.id, id));
  revalidatePath("/admin");
}

async function updateRepairStatus(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!id || !status) return;
  await db.update(repairRequests).set({ status }).where(eq(repairRequests.id, id));
  revalidatePath("/admin");
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  if (!(await isAdminAuthenticated())) {
    return <AdminLogin error={params.erro === "1"} />;
  }

  await ensureSeeded();

  const [ordersList, repairs, productTotal, revenue, items] = await Promise.all([
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(30),
    db.select().from(repairRequests).orderBy(desc(repairRequests.createdAt)).limit(30),
    db.select({ total: sql<number>`count(*)::int` }).from(products),
    db.select({ total: sql<number>`coalesce(sum(${orders.total}),0)::int` }).from(orders),
    db.select().from(orderItems),
  ]);

  const cards = [
    { label: "Pedidos recebidos", value: String(ordersList.length) },
    { label: "Valor em pedidos", value: formatBRL(revenue[0]?.total ?? 0) },
    { label: "Ordens de serviço", value: String(repairs.length) },
    { label: "Produtos no catálogo", value: String(productTotal[0]?.total ?? 0) },
  ];

  return (
    <div className="bg-neutral-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-500">
              Painel interno
            </p>
            <h1 className="mt-2 text-3xl font-black">Administração PHONESMART</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Acompanhe os pedidos da loja online e as ordens de serviço da assistência.
            </p>
          </div>
          <form action={logoutAction}>
            <button className="rounded-full border border-neutral-700 px-5 py-2 text-sm font-bold text-neutral-300 transition hover:border-orange-500 hover:text-orange-500">
              Sair do painel
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <p className="text-2xl font-black text-orange-500">{card.value}</p>
              <p className="text-sm text-neutral-400">{card.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-black">Pedidos da loja</h2>
        <div className="mt-4 space-y-3">
          {ordersList.length === 0 && (
            <p className="rounded-xl border border-dashed border-neutral-700 p-6 text-sm text-neutral-400">
              Nenhum pedido ainda. Faça um pedido de teste pela loja para ver aqui.
            </p>
          )}
          {ordersList.map((order) => (
            <div key={order.id} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-black text-orange-500">{order.code}</p>
                  <p className="text-sm text-neutral-300">
                    {order.customerName} • {order.customerPhone}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatDate(order.createdAt)} • {order.paymentMethod} • {order.deliveryMethod}
                    {order.city ? ` • ${order.city}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black">{formatBRL(order.total)}</p>
                  <form action={updateOrderStatus} className="mt-2 flex gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-sm"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-black text-black">
                      Salvar
                    </button>
                  </form>
                </div>
              </div>
              <ul className="mt-3 border-t border-neutral-800 pt-3 text-sm text-neutral-400">
                {items
                  .filter((item) => item.orderId === order.id)
                  .map((item) => (
                    <li key={item.id}>
                      {item.quantity}x {item.name} — {formatBRL(item.unitPrice * item.quantity)}
                    </li>
                  ))}
              </ul>
              {order.note && <p className="mt-2 text-sm text-neutral-400">Obs.: {order.note}</p>}
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-black">Ordens de serviço (assistência)</h2>
        <div className="mt-4 space-y-3">
          {repairs.length === 0 && (
            <p className="rounded-xl border border-dashed border-neutral-700 p-6 text-sm text-neutral-400">
              Nenhum orçamento solicitado ainda.
            </p>
          )}
          {repairs.map((repair) => (
            <div key={repair.id} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-black text-orange-500">{repair.protocol}</p>
                  <p className="text-sm text-neutral-300">
                    {repair.customerName} • {repair.customerPhone}
                  </p>
                  <p className="text-sm text-neutral-400">
                    {repair.deviceBrand} {repair.deviceModel} — {repair.serviceType}
                  </p>
                  {repair.description && (
                    <p className="mt-1 text-sm text-neutral-500">{repair.description}</p>
                  )}
                  <p className="mt-1 text-xs text-neutral-600">{formatDate(repair.createdAt)}</p>
                </div>
                <form action={updateRepairStatus} className="flex gap-2">
                  <input type="hidden" name="id" value={repair.id} />
                  <select
                    name="status"
                    defaultValue={repair.status}
                    className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-sm"
                  >
                    {repairStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-black text-black">
                    Salvar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
