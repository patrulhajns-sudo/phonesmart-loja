"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, type CartItem } from "@/components/CartProvider";
import { formatBRL, installments, pixPrice } from "@/lib/format";
import { whatsappFor } from "@/lib/site";

export function ProductBuyBox({ item, oldPrice }: { item: Omit<CartItem, "quantity">; oldPrice: number | null }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      {oldPrice && (
        <p className="text-sm text-neutral-400 line-through">{formatBRL(oldPrice)}</p>
      )}
      <p className="text-4xl font-black text-black">{formatBRL(item.price)}</p>
      <p className="mt-1 font-bold text-orange-600">{pixPrice(item.price)} à vista no PIX (7% off)</p>
      <p className="text-sm text-neutral-600">ou 12x de {installments(item.price)} sem juros no cartão</p>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-neutral-300">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2 font-bold">
            −
          </button>
          <span className="w-8 text-center font-black">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="px-4 py-2 font-bold">
            +
          </button>
        </div>
        <button
          onClick={() => add(item, quantity)}
          className="flex-1 rounded-full bg-orange-500 py-3 font-black text-black transition hover:bg-orange-400"
        >
          Adicionar ao carrinho
        </button>
      </div>

      <Link
        href="/checkout"
        onClick={() => add(item, quantity)}
        className="mt-3 block rounded-full bg-black py-3 text-center font-black text-white transition hover:bg-neutral-800"
      >
        Comprar agora
      </Link>

      <a
        href={whatsappFor(`Olá PHONESMART! Tenho interesse no ${item.name} ${item.storage} (${item.condition}). Ainda está disponível?`)}
        target="_blank"
        rel="noreferrer"
        className="mt-3 block rounded-full border border-neutral-300 py-3 text-center font-bold text-black transition hover:border-orange-500"
      >
        Tirar dúvida no WhatsApp
      </a>
    </div>
  );
}
