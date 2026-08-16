import { site } from "@/lib/site";

export function WhatsappFab() {
  return (
    <a
      href={site.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-black shadow-xl shadow-orange-500/30 transition hover:bg-orange-400"
    >
      <span className="text-lg">💬</span> Falar no WhatsApp
    </a>
  );
}
