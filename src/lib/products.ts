import { and, asc, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { catalog } from "@/lib/catalog";

let seedPromise: Promise<void> | null = null;

async function seed() {
  const [row] = await db.select({ total: sql<number>`count(*)::int` }).from(products);
  if ((row?.total ?? 0) > 0) return;
  await db.insert(products).values(catalog).onConflictDoNothing();
}

export async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = seed().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}

export type ProductFilters = {
  brand?: string;
  condition?: string;
  search?: string;
  sort?: string;
  maxPrice?: number;
  minPrice?: number;
  limit?: number;
};

export async function listProducts(filters: ProductFilters = {}): Promise<Product[]> {
  await ensureSeeded();

  const conditions = [];
  if (filters.brand && filters.brand !== "todas") {
    conditions.push(eq(products.brand, filters.brand));
  }
  if (filters.condition && filters.condition !== "todas") {
    conditions.push(eq(products.condition, filters.condition));
  }
  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      or(
        ilike(products.name, term),
        ilike(products.brand, term),
        ilike(products.line, term),
        ilike(products.color, term),
      )!,
    );
  }
  if (typeof filters.minPrice === "number") {
    conditions.push(sql`${products.price} >= ${filters.minPrice}`);
  }
  if (typeof filters.maxPrice === "number") {
    conditions.push(sql`${products.price} <= ${filters.maxPrice}`);
  }

  const order =
    filters.sort === "menor"
      ? asc(products.price)
      : filters.sort === "maior"
        ? desc(products.price)
        : filters.sort === "nome"
          ? asc(products.name)
          : desc(products.featured);

  const query = db
    .select()
    .from(products)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(order, desc(products.price))
    .limit(filters.limit ?? 100);

  return query;
}

export async function getFeatured(limit = 8): Promise<Product[]> {
  await ensureSeeded();
  return db
    .select()
    .from(products)
    .where(and(eq(products.featured, true), eq(products.brand, "Apple")))
    .orderBy(desc(products.price))
    .limit(limit);
}

export async function getFeaturedAndroid(limit = 8): Promise<Product[]> {
  await ensureSeeded();
  return db
    .select()
    .from(products)
    .where(and(eq(products.featured, true), inArray(products.brand, ["Xiaomi", "Poco", "Motorola", "Realme"])))
    .orderBy(desc(products.price))
    .limit(limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureSeeded();
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return row ?? null;
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  await ensureSeeded();
  return db
    .select()
    .from(products)
    .where(and(eq(products.brand, product.brand), sql`${products.id} <> ${product.id}`))
    .orderBy(asc(sql`abs(${products.price} - ${product.price})`))
    .limit(limit);
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (!ids.length) return [];
  await ensureSeeded();
  return db.select().from(products).where(inArray(products.id, ids));
}

export async function brandCounts() {
  await ensureSeeded();
  return db
    .select({ brand: products.brand, total: sql<number>`count(*)::int` })
    .from(products)
    .groupBy(products.brand)
    .orderBy(desc(sql`count(*)`));
}
