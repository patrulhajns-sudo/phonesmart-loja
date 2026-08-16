"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { site } from "@/lib/site";

const links = [
  { href: "/produtos", label: "Loja" },
  { href: "/produtos?brand=Apple", label: "iPhones" },
  { href: "/produtos?brand=Xiaomi", label: "Android" },
  { href: "/assistencia", label: "Assistência" },
  { href: "/sobre", label: "A loja" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [term, setTerm] = useState("");
  const router = useRouter();

  function onSearch(event: FormEvent) {
    event.preventDefault();
    router.push(`/produtos?search=${encodeURIComponent(term)}`);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-black/95 backdrop-blur">
      <div className="bg-orange-500 text-center text-[11px] font-semibold uppercase tracking-widest text-black sm:text-xs">
        <div className="mx-auto max-w-7xl px-4 py-1.5">
          Assistência própria • Garantia de até 12 meses • Parcelamos em até 12x
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500 text-lg font-black text-black">
            P
          </span>
          <span className="text-lg font-black tracking-tight text-white">
            PHONE<span className="text-orange-500">SMART</span>
          </span>
        </Link>

        <form onSubmit={onSearch} className="ml-auto hidden flex-1 max-w-md lg:block">
          <div className="flex items-center rounded-full border border-neutral-700 bg-neutral-900 px-4">
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar iPhone 13, Redmi Note, Moto G..."
              className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
            <button type="submit" className="text-sm font-bold text-orange-500">
              Buscar
            </button>
          </div>
        </form>

        <nav className="hidden items-center gap-5 text-sm font-medium text-neutral-300 xl:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-orange-500">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-orange-400 sm:block"
          >
            WhatsApp
          </a>
          <button
            onClick={() => setOpen(true)}
            className="relative rounded-full border border-neutral-700 px-4 py-2 text-sm font-bold text-white transition hover:border-orange-500"
          >
            Carrinho
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-xs font-black text-black">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-neutral-700 p-2 text-white xl:hidden"
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-neutral-800 bg-black px-4 py-4 xl:hidden">
          <form onSubmit={onSearch} className="mb-3 flex items-center rounded-full border border-neutral-700 px-4">
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar aparelho..."
              className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
            <button type="submit" className="text-sm font-bold text-orange-500">
              Ir
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
