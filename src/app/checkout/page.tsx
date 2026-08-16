"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { formatBRL, installments, pixPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState("pix");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.get("customerName"),
          customerPhone: data.get("customerPhone"),
          customerEmail: data.get("customerEmail"),
          city: data.get("city"),
          deliveryMethod: data.get("deliveryMethod"),
          paymentMethod: data.get("paymentMethod"),
          note: data.get("note"),
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      });
      const json = (await response.json()) as { code?: string; error?: string };
      if (!response.ok || !json.code) {
        setError(json.error ?? "Erro ao finalizar pedido.");
        return;
      }
      clear();
      router.push(`/pedido/${json.code}`);
    } catch {
      setError("Falha de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-black text-black">Seu carrinho está vazio</h1>
        <p className="mt-2 text-neutral-600">
          Escolha um aparelho na loja PHONESMART para finalizar o pedido.
        </p>
        <Link
          href="/produtos"
          className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-black text-black"
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  const totalToPay = payment === "pix" ? pixPrice(total) : formatBRL(total);

  return (
    <div className="bg-neutral-50 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={submit} className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h1 className="text-2xl font-black text-black">Finalizar pedido PHONESMART</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Preencha seus dados. Reservamos o aparelho por 48h e confirmamos tudo pelo WhatsApp.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold text-neutral-700">
              Nome completo *
              <input
                name="customerName"
                required
                className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
              />
            </label>
            <label className="text-sm font-bold text-neutral-700">
              WhatsApp *
              <input
                name="customerPhone"
                required
                placeholder="(11) 99999-9999"
                className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
              />
            </label>
            <label className="text-sm font-bold text-neutral-700">
              E-mail
              <input
                name="customerEmail"
                type="email"
                className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
              />
            </label>
            <label className="text-sm font-bold text-neutral-700">
              Cidade / bairro
              <input
                name="city"
                className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
              />
            </label>
            <label className="text-sm font-bold text-neutral-700">
              Entrega
              <select
                name="deliveryMethod"
                className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
              >
                <option value="retirada">Retirar na loja (grátis)</option>
                <option value="motoboy">Motoboy na região</option>
                <option value="correios">Envio para todo o Brasil</option>
              </select>
            </label>
            <label className="text-sm font-bold text-neutral-700">
              Pagamento
              <select
                name="paymentMethod"
                value={payment}
                onChange={(event) => setPayment(event.target.value)}
                className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
              >
                <option value="pix">PIX (7% de desconto)</option>
                <option value="credito">Cartão de crédito em até 12x</option>
                <option value="debito">Cartão de débito</option>
                <option value="dinheiro">Dinheiro na loja</option>
                <option value="troca">Quero dar meu usado como entrada</option>
              </select>
            </label>
          </div>

          <label className="mt-4 block text-sm font-bold text-neutral-700">
            Observação (cor desejada, troca, dúvidas...)
            <textarea
              name="note"
              rows={3}
              className="mt-1 w-full rounded-lg border border-neutral-300 p-3 font-normal outline-none focus:border-orange-500"
            />
          </label>

          {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-orange-500 py-3.5 font-black text-black transition hover:bg-orange-400 disabled:opacity-60"
          >
            {loading ? "Enviando pedido..." : `Confirmar pedido • ${totalToPay}`}
          </button>
          <p className="mt-3 text-center text-xs text-neutral-500">
            Você não paga nada agora. O pagamento é combinado com a equipe PHONESMART.
          </p>
        </form>

        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="font-black text-black">Resumo do pedido</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-bold text-black">{item.name}</p>
                  <p className="text-xs text-neutral-500">
                    {item.storage} • {item.condition} • {item.quantity}x
                  </p>
                </div>
                <span className="text-sm font-black text-black">
                  {formatBRL(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-1 border-t border-neutral-200 pt-4 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-bold text-black">{formatBRL(total)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>No PIX</span>
              <span className="font-black text-orange-600">{pixPrice(total)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Parcelado</span>
              <span className="font-bold text-black">12x de {installments(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
