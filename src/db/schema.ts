import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export type SpecItem = { label: string; value: string };

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  brand: varchar("brand", { length: 40 }).notNull(),
  line: varchar("line", { length: 60 }).notNull().default(""),
  condition: varchar("condition", { length: 20 }).notNull(),
  storage: varchar("storage", { length: 20 }).notNull().default(""),
  color: varchar("color", { length: 40 }).notNull().default(""),
  price: integer("price").notNull(),
  oldPrice: integer("old_price"),
  batteryHealth: integer("battery_health"),
  warrantyMonths: integer("warranty_months").notNull().default(3),
  stock: integer("stock").notNull().default(1),
  featured: boolean("featured").notNull().default(false),
  badge: varchar("badge", { length: 40 }),
  rating: integer("rating").notNull().default(50),
  description: text("description").notNull().default(""),
  specs: jsonb("specs").$type<SpecItem[]>().notNull().default([]),
  imageUrl: text("image_url").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 120 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 40 }).notNull(),
  customerEmail: varchar("customer_email", { length: 160 }).notNull().default(""),
  city: varchar("city", { length: 120 }).notNull().default(""),
  deliveryMethod: varchar("delivery_method", { length: 40 }).notNull().default("retirada"),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull().default("pix"),
  note: text("note").notNull().default(""),
  total: integer("total").notNull(),
  status: varchar("status", { length: 30 }).notNull().default("novo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id"),
  name: varchar("name", { length: 160 }).notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const repairRequests = pgTable("repair_requests", {
  id: serial("id").primaryKey(),
  protocol: varchar("protocol", { length: 20 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 120 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 40 }).notNull(),
  deviceBrand: varchar("device_brand", { length: 40 }).notNull(),
  deviceModel: varchar("device_model", { length: 80 }).notNull(),
  serviceType: varchar("service_type", { length: 80 }).notNull(),
  description: text("description").notNull().default(""),
  status: varchar("status", { length: 30 }).notNull().default("aguardando"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type RepairRequest = typeof repairRequests.$inferSelect;
