import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato | PHONESMART",
  description: "Endereço, telefone, WhatsApp e horários da PHONESMART.",
};

export default function ContatoPage() {
  return (
    <div className="bg-neutral-50 py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-black text-black">Fale com a PHONESMART</h1>
        <p className="mt-2 text-neutral-600">
          Atendimento humano, rápido e sem robô. Chame no WhatsApp ou passe na loja.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="font-black text-black">Loja física</h2>
              <p className="mt-2 text-sm text-neutral-700">{site.address}</p>
              <p className="text-sm text-neutral-700">{site.city}</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="font-black text-black">Canais</h2>
              <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                <li>WhatsApp / Telefone: {site.phone}</li>
                <li>E-mail: {site.email}</li>
                <li>Instagram: {site.instagram}</li>
              </ul>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-full bg-orange-500 px-5 py-2.5 font-black text-black"
              >
                Abrir conversa no WhatsApp
              </a>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="font-black text-black">Horários</h2>
              <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                {site.hours.map((hour) => (
                  <li key={hour.day}>
                    <strong>{hour.day}:</strong> {hour.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200">
            <iframe
              title="Mapa PHONESMART"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.65%2C-23.56%2C-46.62%2C-23.54&layer=mapnik"
              className="h-full min-h-[420px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
