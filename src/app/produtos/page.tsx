import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { BRANDS, CONDITIONS } from "@/lib/catalog";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProdutosPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const brand = first(params.brand) ?? "todas";
  const condition = first(params.condition) ?? "todas";
  const search = first(params.search) ?? "";
  const sort = first(params.sort) ?? "destaque";
  const maxPriceRaw = first(params.maxPrice) ?? "";
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) * 100 : undefined;

  const items = await listProducts({
    brand,
    condition,
    search,
    sort,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
  });

  return (
    <div className="bg-neutral-50">
      <section className="bg-black py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-black uppercase tracking-widest text-orange-500">
            Loja PHONESMART
          </p>
          <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">
            Celulares novos, seminovos e usados
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            iPhone (11 ao 15), Xiaomi/Redmi, Poco, Motorola e Realme. Todos revisados na nossa
            assistência, com garantia e nota fiscal.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/produtos"
              className={`rounded-full px-4 py-2 text-sm font-bold ${brand === "todas" ? "bg-orange-500 text-black" : "border border-white/25 text-white"}`}
            >
              Todas as marcas
            </Link>
            {BRANDS.map((item) => (
              <Link
                key={item}
                href={`/produtos?brand=${encodeURIComponent(item)}`}
                className={`rounded-full px-4 py-2 text-sm font-bold ${brand === item ? "bg-orange-500 text-black" : "border border-white/25 text-white"}`}
              >
                {item === "Apple" ? "Apple / iPhone" : item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <form className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 md:grid-cols-5">
          <div>
            <label className="text-xs font-bold uppercase text-neutral-500">Buscar</label>
            <input
              name="search"
              defaultValue={search}
              placeholder="iPhone 13, Redmi Note..."
              className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-neutral-500">Marca</label>
            <select
              name="brand"
              defaultValue={brand}
              className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-orange-500"
            >
              <option value="todas">Todas</option>
              {BRANDS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-neutral-500">Condição</label>
            <select
              name="condition"
              defaultValue={condition}
              className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-orange-500"
            >
              <option value="todas">Todas</option>
              {CONDITIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-neutral-500">Até R$</label>
            <input
              name="maxPrice"
              type="number"
              min={0}
              step={100}
              defaultValue={maxPriceRaw}
              placeholder="3000"
              className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-neutral-500">Ordenar</label>
            <div className="mt-1 flex gap-2">
              <select
                name="sort"
                defaultValue={sort}
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-orange-500"
              >
                <option value="destaque">Destaques</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
                <option value="nome">Nome A-Z</option>
              </select>
              <button
                type="submit"
                className="h-11 rounded-lg bg-orange-500 px-5 text-sm font-black text-black"
              >
                Filtrar
              </button>
            </div>
          </div>
        </form>

        <p className="mt-6 text-sm font-semibold text-neutral-600">
          {items.length} aparelho(s) encontrado(s)
        </p>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 font-black text-black">Nenhum aparelho com esses filtros</p>
            <p className="text-sm text-neutral-600">
              Fale com a PHONESMART no WhatsApp: conseguimos por encomenda em até 48h.
            </p>
            <Link
              href="/produtos"
              className="mt-4 inline-block rounded-full bg-black px-5 py-2 text-sm font-bold text-white"
            >
              Limpar filtros
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
