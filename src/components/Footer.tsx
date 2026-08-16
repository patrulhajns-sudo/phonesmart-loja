import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-neutral-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500 text-lg font-black text-black">
              P
            </span>
            <span className="text-lg font-black text-white">
              PHONE<span className="text-orange-500">SMART</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Assistência técnica especializada e venda de celulares novos, seminovos e usados.
            iPhone, Xiaomi, Poco, Motorola e Realme com garantia real.
          </p>
          <p className="mt-4 text-xs text-neutral-500">CNPJ 00.000.000/0001-00</p>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white">Loja</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/produtos?brand=Apple" className="hover:text-orange-500">iPhones</Link></li>
            <li><Link href="/produtos?brand=Xiaomi" className="hover:text-orange-500">Xiaomi / Redmi</Link></li>
            <li><Link href="/produtos?brand=Poco" className="hover:text-orange-500">Poco</Link></li>
            <li><Link href="/produtos?brand=Motorola" className="hover:text-orange-500">Motorola</Link></li>
            <li><Link href="/produtos?brand=Realme" className="hover:text-orange-500">Realme</Link></li>
            <li><Link href="/produtos?condition=Seminovo" className="hover:text-orange-500">Seminovos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white">Serviços</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/assistencia" className="hover:text-orange-500">Orçamento de conserto</Link></li>
            <li><Link href="/assistencia#servicos" className="hover:text-orange-500">Troca de tela</Link></li>
            <li><Link href="/assistencia#servicos" className="hover:text-orange-500">Troca de bateria</Link></li>
            <li><Link href="/acompanhar" className="hover:text-orange-500">Acompanhar pedido/OS</Link></li>
            <li><Link href="/admin" className="hover:text-orange-500">Painel da loja</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white">Contato</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{site.address}</li>
            <li>{site.city}</li>
            <li>
              <a href={site.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-orange-500">
                WhatsApp {site.phone}
              </a>
            </li>
            <li>{site.email}</li>
            <li>{site.instagram}</li>
          </ul>
          <div className="mt-4 space-y-1 text-xs text-neutral-500">
            {site.hours.map((hour) => (
              <p key={hour.day}>
                {hour.day}: <span className="text-neutral-300">{hour.time}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-5 text-center text-xs">
        © {new Date().getFullYear()} PHONESMART — Todos os direitos reservados. Preços e estoque
        sujeitos a alteração.
      </div>
    </footer>
  );
}
