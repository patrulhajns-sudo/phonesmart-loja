import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getRelated } from "@/lib/products";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product
      ? `${product.name} ${product.storage} ${product.condition} | PHONESMART`
      : "Produto | PHONESMART",
  };
}

export default async function ProdutoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelated(product);

  return (
    <div className="bg-neutral-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500">
        <Link href="/" className="hover:text-orange-600">Início</Link> /{" "}
        <Link href="/produtos" className="hover:text-orange-600">Loja</Link> /{" "}
        <Link href={`/produtos?brand=${product.brand}`} className="hover:text-orange-600">
          {product.brand}
        </Link>{" "}
        / <span className="text-black">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="overflow-hidden rounded-3xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-[420px] w-full object-cover opacity-95"
            />
          </div>
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-black text-black">Sobre este aparelho</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">{product.description}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-black text-black">Ficha técnica</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between border-b border-dashed border-neutral-200 pb-2">
                  <dt className="text-sm text-neutral-500">{spec.label}</dt>
                  <dd className="text-sm font-bold text-black">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-600">
              {product.brand} • {product.line}
            </p>
            <h1 className="mt-1 text-3xl font-black text-black">
              {product.name} {product.storage}
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Cor {product.color} • {product.condition}
              {product.batteryHealth ? ` • Bateria ${product.batteryHealth}%` : ""}
            </p>
            <p className="mt-1 text-sm font-bold text-orange-600">
              {product.stock > 0 ? `${product.stock} unidade(s) em estoque` : "Sob encomenda"}
            </p>
          </div>

          <ProductBuyBox
            oldPrice={product.oldPrice}
            item={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              condition: product.condition,
              storage: product.storage,
            }}
          />

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-black text-black">Garantias PHONESMART</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>✅ {product.warrantyMonths} meses de garantia contra defeitos de fábrica</li>
              <li>✅ Checklist de 27 pontos feito na nossa própria assistência</li>
              <li>✅ Nota fiscal e suporte técnico direto com o dono da loja</li>
              <li>✅ Aceitamos seu celular usado como parte do pagamento</li>
              <li>✅ Retirada na loja em até 30 minutos ou entrega na região</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-black p-6 text-white">
            <h3 className="font-black">Quebrou? A gente conserta.</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Comprando na PHONESMART você tem prioridade na assistência: troca de tela, bateria e
              reparo de placa com 90 dias de garantia.
            </p>
            <Link
              href="/assistencia"
              className="mt-4 inline-block rounded-full bg-orange-500 px-5 py-2 text-sm font-black text-black"
            >
              Ver serviços
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pt-14">
          <h2 className="text-2xl font-black text-black">Quem viu este, viu também</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
