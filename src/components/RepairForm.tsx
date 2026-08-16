"use client";

import { useState, type FormEvent } from "react";
import { repairServiceOptions } from "@/lib/catalog";
import { whatsappFor } from "@/lib/site";

const brands = ["Apple", "Xiaomi", "Poco", "Motorola", "Realme", "Samsung", "Outra"];

export function RepairForm() {
  const [loading, setLoading] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    try {
      const response = await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.get("customerName"),
          customerPhone: data.get("customerPhone"),
          deviceBrand: data.get("deviceBrand"),
          deviceModel: data.get("deviceModel"),
          serviceType: data.get("serviceType"),
          description: data.get("description"),
        }),
      });
      const json = (await response.json()) as { protocol?: string; error?: string };
      if (!response.ok || !json.protocol) {
        setError(json.error ?? "Erro ao enviar. Tente novamente.");
        return;
      }
      setProtocol(json.protocol);
      form.reset();
    } catch {
      setError("Falha de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (protocol) {
    return (
      <div className="rounded-2xl border border-orange-500 bg-white p-8 text-center">
        <p className="text-4xl">🛠️</p>
        <h3 className="mt-3 text-2xl font-black text-black">Orçamento solicitado!</h3>
        <p className="mt-2 text-neutral-600">
          Seu protocolo na PHONESMART é:
        </p>
        <p className="mt-3 inline-block rounded-full bg-black px-6 py-3 text-lg font-black tracking-widest text-orange-500">
          {protocol}
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          Respondemos em até 1 hora útil. Acompanhe o status na página “Acompanhar”.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappFor(`Olá PHONESMART! Abri o orçamento ${protocol} pelo site.`)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-orange-500 px-5 py-2.5 font-black text-black"
          >
            Adiantar no WhatsApp
          </a>
          <button
            onClick={() => setProtocol("")}
            className="rounded-full border border-neutral-300 px-5 py-2.5 font-bold text-black"
          >
            Enviar outro aparelho
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h3 className="text-xl font-black text-black">Orçamento rápido e gratuito</h3>
      <p className="mt-1 text-sm text-neutral-600">
        Conte o que houve com o seu aparelho. Diagnóstico sem compromisso.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-neutral-700">
          Seu nome *
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
          Marca
          <select
            name="deviceBrand"
            className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
          >
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-neutral-700">
          Modelo *
          <input
            name="deviceModel"
            required
            placeholder="iPhone 12 Pro, Redmi Note 12..."
            className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
          />
        </label>
        <label className="text-sm font-bold text-neutral-700 sm:col-span-2">
          Serviço desejado
          <select
            name="serviceType"
            className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 font-normal outline-none focus:border-orange-500"
          >
            {repairServiceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-neutral-700 sm:col-span-2">
          Descreva o problema
          <textarea
            name="description"
            rows={4}
            placeholder="Ex.: caiu no chão, a tela trincou e o touch falha na parte de cima."
            className="mt-1 w-full rounded-lg border border-neutral-300 p-3 font-normal outline-none focus:border-orange-500"
          />
        </label>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-full bg-orange-500 py-3.5 font-black text-black transition hover:bg-orange-400 disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Solicitar orçamento grátis"}
      </button>
    </form>
  );
}
