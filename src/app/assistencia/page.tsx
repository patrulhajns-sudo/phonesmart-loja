import Link from "next/link";
import type { Metadata } from "next";
import { RepairForm } from "@/components/RepairForm";
import { services } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Assistência técnica | PHONESMART",
  description:
    "Conserto de celulares na PHONESMART: troca de tela, bateria, conector de carga, reparo de placa e oxidação com 90 dias de garantia.",
};

const flow = [
  { n: "1", t: "Você descreve o problema", d: "Pelo site ou WhatsApp, sem custo." },
  { n: "2", t: "Diagnóstico na bancada", d: "Abrimos o aparelho e enviamos o laudo com o valor exato." },
  { n: "3", t: "Você aprova", d: "Só executamos depois do seu OK. Sem surpresa na conta." },
  { n: "4", t: "Entrega com garantia", d: "90 dias de garantia em peça e mão de obra." },
];

export default function AssistenciaPage() {
  return (
    <div className="bg-neutral-50">
      <section className="relative overflow-hidden bg-black py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/assistencia.jpg"
          alt="Bancada de assistência técnica PHONESMART"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-7xl px-4">
          <p className="text-xs font-black uppercase tracking-widest text-orange-500">
            PHONESMART assistência técnica
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black text-white md:text-5xl">
            Seu celular consertado hoje, com garantia de 90 dias
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-300">
            Somos especialistas em iPhone, Xiaomi, Poco, Motorola e Realme. Troca de tela e bateria
            no mesmo dia, microssoldagem e recuperação de aparelhos molhados. Mais de 18 mil
            aparelhos reparados.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#orcamento"
              className="rounded-full bg-orange-500 px-7 py-3.5 font-black text-black transition hover:bg-orange-400"
            >
              Fazer orçamento grátis
            </a>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition hover:border-orange-500 hover:text-orange-500"
            >
              WhatsApp {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-black text-black">Serviços e preços de referência</h2>
        <p className="text-neutral-600">
          Valores variam conforme o modelo. O orçamento final é sempre confirmado antes do reparo.
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-orange-500"
            >
              <p className="text-3xl">{service.icon}</p>
              <h3 className="mt-3 text-lg font-black text-black">{service.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{service.desc}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-black text-orange-600">{service.price}</span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 font-bold text-neutral-600">
                  ⏱ {service.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-black text-white">Como funciona o conserto</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-4">
            {flow.map((step) => (
              <div key={step.n} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-500 font-black text-black">
                  {step.n}
                </span>
                <p className="mt-3 font-black text-white">{step.t}</p>
                <p className="mt-1 text-sm text-neutral-400">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="orcamento" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_0.85fr]">
        <RepairForm />
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-black text-black">Por que confiar na PHONESMART?</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>🔧 12 anos de bancada e mais de 18 mil aparelhos reparados</li>
              <li>🧾 Laudo transparente: você aprova antes de qualquer serviço</li>
              <li>🧪 Peças testadas, com opção original ou premium</li>
              <li>🛡️ 90 dias de garantia em peça e mão de obra</li>
              <li>📦 Buscamos e entregamos o aparelho na região (consulte)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-orange-500 p-6 text-black">
            <h3 className="font-black">Não compensa consertar?</h3>
            <p className="mt-2 text-sm">
              A gente avalia seu aparelho e usa o valor como entrada em um celular novo ou seminovo
              da nossa loja. É o jeito mais barato de trocar de celular.
            </p>
            <Link
              href="/produtos"
              className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-black text-white"
            >
              Ver aparelhos disponíveis
            </Link>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-black text-black">Horário de atendimento</h3>
            <ul className="mt-3 space-y-1 text-sm text-neutral-700">
              {site.hours.map((hour) => (
                <li key={hour.day}>
                  <strong>{hour.day}:</strong> {hour.time}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-neutral-600">
              {site.address} — {site.city}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
