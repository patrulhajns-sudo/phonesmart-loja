import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { services } from "@/lib/catalog";
import { brandCounts, getFeatured, getFeaturedAndroid, listProducts } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const steps = [
  { n: "01", t: "Escolha o aparelho", d: "Navegue pela loja, filtre por marca, condição e preço e adicione ao carrinho." },
  { n: "02", t: "Finalize o pedido", d: "Preencha seus dados no checkout e escolha PIX, cartão em até 12x ou pagamento na loja." },
  { n: "03", t: "Reserva confirmada", d: "Você recebe um código do pedido e nossa equipe confirma tudo pelo WhatsApp." },
  { n: "04", t: "Retire ou receba", d: "Retirada na loja em 30 minutos ou entrega para toda a região." },
];

const faqs = [
  { q: "O que é um aparelho seminovo da PHONESMART?", a: "É um celular usado que passou pelo nosso checklist de 27 pontos na bancada: tela, touch, bateria, câmeras, biometria, alto-falantes e carregamento. Só vai para a vitrine se estiver impecável, e todo seminovo sai com no mínimo 85% de saúde de bateria." },
  { q: "Vocês dão garantia?", a: "Sim. Aparelhos novos e lacrados têm 12 meses, seminovos 6 meses e usados 3 meses de garantia PHONESMART. Serviços de assistência têm 90 dias de garantia na peça e na mão de obra." },
  { q: "Aceitam meu celular usado como entrada?", a: "Aceitamos! Avaliamos seu aparelho na hora e abatemos o valor na compra do novo. Traga o aparelho na loja ou mande fotos pelo WhatsApp." },
  { q: "Quanto tempo demora um conserto?", a: "Troca de tela e bateria costumam ficar prontas no mesmo dia (1h a 3h). Reparos de placa e oxidação levam de 24h a 72h. Você acompanha tudo pelo número de protocolo." },
  { q: "Como faço para pagar?", a: "PIX com 7% de desconto, cartão de crédito em até 12x, débito ou dinheiro na loja. O pedido feito no site fica reservado por 48h." },
];

const reviews = [
  { name: "Amanda R.", text: "Comprei um iPhone 13 seminovo na PHONESMART. Veio impecável, com bateria em 90% e nota fiscal. Já indiquei pra três amigas!", stars: 5 },
  { name: "Diego M.", text: "Meu Redmi caiu na água e achei que tinha perdido tudo. Eles recuperaram a placa em dois dias e ainda salvaram minhas fotos.", stars: 5 },
  { name: "Cleber S.", text: "Troquei a tela do iPhone 12 Pro em 1 hora, atendimento honesto e preço justo. Melhor assistência da região.", stars: 5 },
];

export default async function HomePage() {
  const [iphones, androids, brands, novidades] = await Promise.all([
    getFeatured(8),
    getFeaturedAndroid(8),
    brandCounts(),
    listProducts({ sort: "menor", limit: 4 }),
  ]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt="Loja e assistência PHONESMART"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400">
            Assistência técnica própria desde 2013
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] text-white md:text-6xl">
            PHONE<span className="text-orange-500">SMART</span>
            <span className="mt-3 block text-2xl font-bold text-neutral-200 md:text-3xl">
              Consertamos o seu celular — e vendemos o próximo.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
            Somos a assistência que virou loja. Aqui você encontra <strong className="text-white">iPhones novos e
            seminovos</strong>, além de Xiaomi, Poco, Motorola e Realme — todos testados peça por peça na nossa
            própria bancada, com garantia e nota fiscal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/produtos?brand=Apple"
              className="rounded-full bg-orange-500 px-7 py-3.5 font-black text-black transition hover:bg-orange-400"
            >
              Ver iPhones em destaque
            </Link>
            <Link
              href="/produtos"
              className="rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition hover:border-orange-500 hover:text-orange-500"
            >
              Todos os celulares
            </Link>
            <Link
              href="/assistencia"
              className="rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition hover:border-orange-500 hover:text-orange-500"
            >
              Orçamento de conserto
            </Link>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <dt className="text-2xl font-black text-orange-500">{stat.value}</dt>
                <dd className="text-xs text-neutral-300">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: "🔧", t: "Testado na bancada", d: "Checklist de 27 pontos em todo aparelho" },
            { i: "🛡️", t: "Garantia real", d: "Até 12 meses + 90 dias nos serviços" },
            { i: "💳", t: "12x no cartão", d: "Ou 7% de desconto pagando no PIX" },
            { i: "🔁", t: "Aceitamos usado", d: "Seu celular como entrada na troca" },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3">
              <span className="text-2xl">{item.i}</span>
              <div>
                <p className="font-black text-black">{item.t}</p>
                <p className="text-sm text-neutral-600">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTAQUE IPHONES */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="overflow-hidden rounded-3xl bg-black">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                Destaque da casa
              </span>
              <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
                Linha <span className="text-orange-500">iPhone</span> — do 11 ao 15
              </h2>
              <p className="mt-4 text-neutral-300">
                Novos lacrados com nota fiscal e seminovos com bateria acima de 85%, testados e com
                garantia PHONESMART. Trabalhamos com iPhone 11, 12, 13, 14 e 15 — incluindo as
                versões Pro, Pro Max, Plus e mini.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15"].map((line) => (
                  <Link
                    key={line}
                    href={`/produtos?search=${encodeURIComponent(line)}`}
                    className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-orange-500 hover:text-orange-500"
                  >
                    {line}
                  </Link>
                ))}
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/iphones.jpg"
              alt="Linha de iPhones disponíveis na PHONESMART"
              className="h-64 w-full object-cover md:h-full"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-black">iPhones em destaque</h3>
            <p className="text-neutral-600">Os modelos que mais saem da nossa vitrine.</p>
          </div>
          <Link href="/produtos?brand=Apple" className="font-bold text-orange-600 hover:underline">
            Ver todos os iPhones →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {iphones.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* MARCAS */}
      <section className="bg-neutral-950 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h3 className="text-center text-2xl font-black text-white">
            Trabalhamos com as marcas que o brasileiro usa
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {brands.map((brand) => (
              <Link
                key={brand.brand}
                href={`/produtos?brand=${encodeURIComponent(brand.brand)}`}
                className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center transition hover:border-orange-500"
              >
                <p className="text-xl font-black text-white">{brand.brand}</p>
                <p className="mt-1 text-sm text-orange-500">{brand.total} modelos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ANDROID */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-black">Android que vale cada real</h3>
            <p className="text-neutral-600">Xiaomi, Poco, Motorola e Realme com preço de loja física.</p>
          </div>
          <Link href="/produtos" className="font-bold text-orange-600 hover:underline">
            Ver catálogo completo →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {androids.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ASSISTÊNCIA */}
      <section className="bg-black py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Nossa origem
            </span>
            <h3 className="mt-5 text-3xl font-black text-white md:text-4xl">
              A assistência técnica que você já conhece
            </h3>
            <p className="mt-4 text-neutral-300">
              Antes de vender celulares, a PHONESMART já consertava o seu. São mais de 18 mil
              aparelhos reparados, com peças de qualidade, laudo transparente e 90 dias de garantia
              em cada serviço. Faça o orçamento pelo site e receba a resposta no WhatsApp.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.slice(0, 4).map((service) => (
                <div key={service.title} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                  <p className="text-lg">{service.icon}</p>
                  <p className="mt-1 font-bold text-white">{service.title}</p>
                  <p className="text-sm text-orange-500">{service.price}</p>
                </div>
              ))}
            </div>
            <Link
              href="/assistencia"
              className="mt-7 inline-block rounded-full bg-orange-500 px-7 py-3.5 font-black text-black transition hover:bg-orange-400"
            >
              Pedir orçamento grátis
            </Link>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/assistencia.jpg"
            alt="Técnico da PHONESMART consertando um celular"
            className="h-80 w-full rounded-3xl object-cover lg:h-[460px]"
          />
        </div>
      </section>

      {/* MAIS BARATOS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h3 className="text-2xl font-black text-black">Entradas a partir de R$ 599</h3>
        <p className="text-neutral-600">Opções econômicas para quem precisa de um celular hoje.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {novidades.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* COMO COMPRAR */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h3 className="text-center text-2xl font-black text-black">Como comprar na PHONESMART</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <span className="text-3xl font-black text-orange-500">{step.n}</span>
                <p className="mt-2 font-black text-black">{step.t}</p>
                <p className="mt-1 text-sm text-neutral-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h3 className="text-center text-2xl font-black text-black">Quem já é cliente PHONESMART</h3>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.name} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <p className="text-orange-500">{"★".repeat(review.stars)}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">“{review.text}”</p>
              <footer className="mt-4 text-sm font-black text-black">{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h3 className="text-center text-2xl font-black text-black">Perguntas frequentes</h3>
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-neutral-200 bg-white p-5">
                <summary className="cursor-pointer list-none font-bold text-black marker:hidden">
                  <span className="text-orange-500">+ </span>
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-orange-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-12 text-center">
          <h3 className="text-3xl font-black text-black">
            Visite a PHONESMART ou fale com a gente agora
          </h3>
          <p className="max-w-2xl text-black/80">
            {site.address} — {site.city}. Segunda a sexta das 9h às 19h e sábado das 9h às 15h.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-7 py-3.5 font-black text-white transition hover:bg-neutral-800"
            >
              Chamar no WhatsApp
            </a>
            <Link
              href="/contato"
              className="rounded-full border-2 border-black px-7 py-3.5 font-black text-black transition hover:bg-black hover:text-white"
            >
              Ver endereço e horários
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
