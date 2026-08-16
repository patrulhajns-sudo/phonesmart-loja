"use client";

import { useState, type FormEvent } from "react";

type TrackResult =
  | {
      type: "order";
      order: {
        code: string;
        customerName: string;
        status: string;
        total: number;
        paymentMethod: string;
        deliveryMethod: string;
        createdAt: string;
      };
      items: { id: number; name: string; quantity: number; unitPrice: number }[];
    }
  | {
      type: "repair";
      repair: {
        protocol: string;
        customerName: string;
        deviceBrand: string;
        deviceModel: string;
        serviceType: string;
        status: string;
        createdAt: string;
      };
    };

export default function AcompanharPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/track?code=${encodeURIComponent(code)}`);
      const json = await response.json();
      if (!response.ok) {
        setError(json.error ?? "Não encontramos esse código.");
        return;
      }
      setResult(json as TrackResult);
    } catch {
      setError("Falha de conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-neutral-50 py-14">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-black text-black">Acompanhar pedido ou conserto</h1>
        <p className="mt-2 text-neutral-600">
          Digite o código do pedido (ex.: PS-A1B2C) ou o protocolo da ordem de serviço (ex.:
          OS-A1B2C) que a PHONESMART enviou para você.
        </p>

        <form onSubmit={submit} className="mt-6 flex gap-2">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="PS-XXXXX ou OS-XXXXX"
            className="h-12 flex-1 rounded-full border border-neutral-300 px-5 outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-orange-500 px-6 font-black text-black disabled:opacity-60"
          >
            {loading ? "..." : "Buscar"}
          </button>
        </form>

        {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</p>}

        {result?.type === "order" && (
          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-widest text-orange-600">Pedido</p>
            <h2 className="text-2xl font-black text-black">{result.order.code}</h2>
            <p className="mt-1 text-sm text-neutral-600">Cliente: {result.order.customerName}</p>
            <p className="mt-3 inline-block rounded-full bg-black px-4 py-1.5 text-sm font-bold text-orange-500">
              Status: {result.order.status}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-neutral-700">
              {result.items.map((item) => (
                <li key={item.id}>
                  {item.quantity}x {item.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-black text-black">
              Total: {(result.order.total / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        )}

        {result?.type === "repair" && (
          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-widest text-orange-600">
              Ordem de serviço
            </p>
            <h2 className="text-2xl font-black text-black">{result.repair.protocol}</h2>
            <p className="mt-1 text-sm text-neutral-600">Cliente: {result.repair.customerName}</p>
            <p className="mt-3 inline-block rounded-full bg-black px-4 py-1.5 text-sm font-bold text-orange-500">
              Status: {result.repair.status}
            </p>
            <p className="mt-4 text-sm text-neutral-700">
              Aparelho: {result.repair.deviceBrand} {result.repair.deviceModel}
            </p>
            <p className="text-sm text-neutral-700">Serviço: {result.repair.serviceType}</p>
          </div>
        )}
      </div>
    </div>
  );
}
