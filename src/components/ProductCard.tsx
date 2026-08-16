"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatBRL, installments, pixPrice } from "@/lib/format";

export type ProductCardData = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  condition: string;
  storage: string;
  color: string;
  price: number;
  oldPrice: number | null;
  batteryHealth: number | null;
  badge: string | null;
  stock: number;
  imageUrl: string;
  warrantyMonths: number;
};

const conditionStyle: Record<string, string> = {
  Novo: "bg-orange-500 text-black",
  Seminovo: "bg-white text-black",
  Usado: "bg-neutral-800 text-white",
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const { add } = useCart();
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl">
      <Link href={`/produtos/${product.slug}`} className="relative block bg-neutral-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-52 w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${
              conditionStyle[product.condition] ?? "bg-white text-black"
            }`}
          >
            {product.condition}
          </span>
          {product.badge && (
            <span className="rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-bold text-orange-400">
              {product.badge}
            </span>
          )}
        </div>
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-black text-black">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600">
          {product.brand}
        </p>
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="mt-1 text-base font-black leading-tight text-black hover:text-orange-600">
            {product.name} {product.storage}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-neutral-500">
          {product.color}
          {product.batteryHealth ? ` • Bateria ${product.batteryHealth}%` : ""} • Garantia{" "}
          {product.warrantyMonths} meses
        </p>

        <div className="mt-3">
          {product.oldPrice && (
            <p className="text-xs text-neutral-400 line-through">{formatBRL(product.oldPrice)}</p>
          )}
          <p className="text-xl font-black text-black">{formatBRL(product.price)}</p>
          <p className="text-xs font-semibold text-orange-600">
            {pixPrice(product.price)} no PIX • 12x de {installments(product.price)}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() =>
              add({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                condition: product.condition,
                storage: product.storage,
              })
            }
            className="flex-1 rounded-full bg-orange-500 py-2.5 text-sm font-black text-black transition hover:bg-orange-400"
          >
            Comprar
          </button>
          <Link
            href={`/produtos/${product.slug}`}
            className="rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-bold text-black transition hover:border-black"
          >
            Detalhes
          </Link>
        </div>
        <p className="mt-2 text-center text-[11px] text-neutral-400">
          {product.stock > 0 ? `${product.stock} em estoque na loja` : "Sob encomenda"}
        </p>
      </div>
    </article>
  );
}
