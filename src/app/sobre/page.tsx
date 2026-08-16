import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "A loja | PHONESMART",
  description:
    "Conheça a PHONESMART: assistência técnica de celulares que também vende iPhones novos e seminovos, Xiaomi, Poco, Motorola e Realme.",
};

export default function SobrePage() {
  return (
    <div>
      <section className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-black uppercase tracking-widest text-orange-500">Quem somos</p>
          <h1 className="mt-3 text-4xl font-black text-white">
            PHONE<span className="text-orange-500">SMART</span> — da bancada para a vitrine
          </h1>
          <p className="mt-5 text-neutral-300">
            A PHONESMART nasceu em 2013 como uma assistência técnica de bairro, consertando telas
            quebradas e baterias viciadas. Com o tempo, os próprios clientes começaram a pedir
            indicação de aparelhos — e foi assim que passamos a vender também.
          </p>
          <p className="mt-4 text-neutral-300">
            Hoje somos referência em conserto de celulares <strong className="text-white">e</strong>{" "}
            na venda de iPhones novos e seminovos, além de Xiaomi, Poco, Motorola e Realme. A grande
            diferença? Cada aparelho que vendemos passou pela nossa própria bancada. Quem testa,
            aprova e dá garantia é quem conserta.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Transparência", d: "Laudo antes do reparo, saúde de bateria informada em todo seminovo e nota fiscal em toda venda." },
            { t: "Técnica de verdade", d: "Microssoldagem, estação de retrabalho, ultrassom e equipamentos profissionais na bancada." },
            { t: "Pós-venda", d: "Comprou aqui, tem prioridade na assistência e suporte direto no WhatsApp com a nossa equipe." },
          ].map((item) => (
            <div key={item.t} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-black text-black">{item.t}</h2>
              <p className="mt-2 text-sm text-neutral-600">{item.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-neutral-950 p-6 text-center">
              <p className="text-3xl font-black text-orange-500">{stat.value}</p>
              <p className="mt-1 text-sm text-neutral-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero.jpg" alt="Loja PHONESMART" className="h-80 w-full object-cover" />
        </div>

        <div className="mt-12 rounded-3xl bg-orange-500 p-8 text-center">
          <h2 className="text-2xl font-black text-black">
            Venha conhecer a loja ou compre pelo site
          </h2>
          <p className="mt-2 text-black/80">
            {site.address} — {site.city}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/produtos" className="rounded-full bg-black px-6 py-3 font-black text-white">
              Ver celulares
            </Link>
            <Link
              href="/assistencia"
              className="rounded-full border-2 border-black px-6 py-3 font-black text-black"
            >
              Orçamento de conserto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
