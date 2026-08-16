"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatBRL, pixPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, setOpen, remove, setQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        aria-label="Fechar carrinho"
        onClick={() => setOpen(false)}
        className="flex-1 bg-black/70"
      />
      <aside className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-lg font-black text-black">
            Seu carrinho <span className="text-orange-500">PHONESMART</span>
          </h2>
          <button onClick={() => setOpen(false)} className="text-2xl leading-none text-neutral-500">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-neutral-500">
              <p className="text-4xl">🛒</p>
              <p className="mt-3 font-semibold">Seu carrinho está vazio</p>
              <Link
                href="/produtos"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-black"
              >
                Ver aparelhos
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-xl border border-neutral-200 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-black">{item.name}</p>
                    <p className="text-xs text-neutral-500">
                      {item.storage} • {item.condition}
                    </p>
                    <p className="mt-1 text-sm font-black text-orange-600">
                      {formatBRL(item.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 rounded border border-neutral-300 font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 rounded border border-neutral-300 font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="ml-auto text-xs font-semibold text-neutral-500 underline"
                      >
                        remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-5 py-4">
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>Subtotal</span>
              <span className="font-bold text-black">{formatBRL(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>No PIX (7% off)</span>
              <span className="font-black text-orange-600">{pixPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full bg-black py-3 text-center font-bold text-white transition hover:bg-orange-500 hover:text-black"
            >
              Finalizar pedido
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
