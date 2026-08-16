import type { NewProduct, SpecItem } from "@/db/schema";

const PHOTOS = [
  "https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
  "https://images.pexels.com/photos/1647978/pexels-photo-1647978.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
  "https://images.pexels.com/photos/11120516/pexels-photo-11120516.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
  "https://images.pexels.com/photos/18311092/pexels-photo-18311092.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
  "https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
  "https://images.pexels.com/photos/14979013/pexels-photo-14979013.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
  "https://images.pexels.com/photos/17984647/pexels-photo-17984647.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
  "https://images.pexels.com/photos/9403817/pexels-photo-9403817.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900",
];

export const BRANDS = ["Apple", "Xiaomi", "Poco", "Motorola", "Realme"] as const;
export const CONDITIONS = ["Novo", "Seminovo", "Usado"] as const;

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Row = {
  name: string;
  brand: string;
  line: string;
  condition: string;
  storage: string;
  color: string;
  price: number;
  oldPrice?: number;
  batteryHealth?: number;
  warrantyMonths?: number;
  stock?: number;
  featured?: boolean;
  badge?: string;
  rating?: number;
  chip: string;
  screen: string;
  camera: string;
  battery: string;
  ram: string;
};

const rows: Row[] = [
  // ---------- APPLE (destaques) ----------
  { name: "iPhone 15 Pro Max", brand: "Apple", line: "iPhone 15", condition: "Novo", storage: "256GB", color: "Titânio Natural", price: 899900, oldPrice: 999900, warrantyMonths: 12, stock: 4, featured: true, badge: "Lacrado", rating: 50, chip: "A17 Pro", screen: '6,7" Super Retina XDR 120Hz', camera: "48MP + 12MP + 12MP", battery: "4441 mAh", ram: "8GB" },
  { name: "iPhone 15 Pro", brand: "Apple", line: "iPhone 15", condition: "Seminovo", storage: "256GB", color: "Titânio Azul", price: 679900, oldPrice: 749900, batteryHealth: 98, warrantyMonths: 6, stock: 3, featured: true, badge: "Bateria 98%", rating: 49, chip: "A17 Pro", screen: '6,1" Super Retina XDR 120Hz', camera: "48MP + 12MP + 12MP", battery: "3274 mAh", ram: "8GB" },
  { name: "iPhone 15", brand: "Apple", line: "iPhone 15", condition: "Novo", storage: "128GB", color: "Preto", price: 549900, oldPrice: 599900, warrantyMonths: 12, stock: 6, featured: true, badge: "Lacrado", rating: 49, chip: "A16 Bionic", screen: '6,1" Super Retina XDR', camera: "48MP + 12MP", battery: "3349 mAh", ram: "6GB" },
  { name: "iPhone 15 Plus", brand: "Apple", line: "iPhone 15", condition: "Seminovo", storage: "128GB", color: "Verde", price: 519900, batteryHealth: 97, warrantyMonths: 6, stock: 2, chip: "A16 Bionic", screen: '6,7" Super Retina XDR', camera: "48MP + 12MP", battery: "4383 mAh", ram: "6GB" },
  { name: "iPhone 14 Pro Max", brand: "Apple", line: "iPhone 14", condition: "Seminovo", storage: "256GB", color: "Roxo Profundo", price: 589900, oldPrice: 649900, batteryHealth: 94, warrantyMonths: 6, stock: 3, featured: true, badge: "Mais vendido", rating: 50, chip: "A16 Bionic", screen: '6,7" ProMotion 120Hz', camera: "48MP + 12MP + 12MP", battery: "4323 mAh", ram: "6GB" },
  { name: "iPhone 14 Pro", brand: "Apple", line: "iPhone 14", condition: "Seminovo", storage: "128GB", color: "Prateado", price: 499900, batteryHealth: 92, warrantyMonths: 6, stock: 4, featured: true, chip: "A16 Bionic", screen: '6,1" ProMotion 120Hz', camera: "48MP + 12MP + 12MP", battery: "3200 mAh", ram: "6GB" },
  { name: "iPhone 14", brand: "Apple", line: "iPhone 14", condition: "Novo", storage: "128GB", color: "Meia-noite", price: 399900, oldPrice: 439900, warrantyMonths: 12, stock: 5, featured: true, badge: "Lacrado", chip: "A15 Bionic", screen: '6,1" Super Retina XDR', camera: "12MP + 12MP", battery: "3279 mAh", ram: "6GB" },
  { name: "iPhone 14 Plus", brand: "Apple", line: "iPhone 14", condition: "Seminovo", storage: "128GB", color: "Estelar", price: 379900, batteryHealth: 95, warrantyMonths: 6, stock: 2, chip: "A15 Bionic", screen: '6,7" Super Retina XDR', camera: "12MP + 12MP", battery: "4325 mAh", ram: "6GB" },
  { name: "iPhone 13 Pro Max", brand: "Apple", line: "iPhone 13", condition: "Seminovo", storage: "256GB", color: "Grafite", price: 429900, oldPrice: 469900, batteryHealth: 90, warrantyMonths: 6, stock: 3, featured: true, chip: "A15 Bionic", screen: '6,7" ProMotion 120Hz', camera: "12MP + 12MP + 12MP", battery: "4352 mAh", ram: "6GB" },
  { name: "iPhone 13 Pro", brand: "Apple", line: "iPhone 13", condition: "Seminovo", storage: "128GB", color: "Azul Sierra", price: 369900, batteryHealth: 89, warrantyMonths: 6, stock: 3, chip: "A15 Bionic", screen: '6,1" ProMotion 120Hz', camera: "12MP + 12MP + 12MP", battery: "3095 mAh", ram: "6GB" },
  { name: "iPhone 13", brand: "Apple", line: "iPhone 13", condition: "Novo", storage: "128GB", color: "Rosa", price: 319900, oldPrice: 349900, warrantyMonths: 12, stock: 5, featured: true, badge: "Custo-benefício", chip: "A15 Bionic", screen: '6,1" Super Retina XDR', camera: "12MP + 12MP", battery: "3240 mAh", ram: "4GB" },
  { name: "iPhone 13 mini", brand: "Apple", line: "iPhone 13", condition: "Seminovo", storage: "128GB", color: "Meia-noite", price: 259900, batteryHealth: 88, warrantyMonths: 6, stock: 2, chip: "A15 Bionic", screen: '5,4" Super Retina XDR', camera: "12MP + 12MP", battery: "2438 mAh", ram: "4GB" },
  { name: "iPhone 12 Pro Max", brand: "Apple", line: "iPhone 12", condition: "Seminovo", storage: "128GB", color: "Azul Pacífico", price: 329900, batteryHealth: 87, warrantyMonths: 6, stock: 2, chip: "A14 Bionic", screen: '6,7" Super Retina XDR', camera: "12MP + 12MP + 12MP", battery: "3687 mAh", ram: "6GB" },
  { name: "iPhone 12 Pro", brand: "Apple", line: "iPhone 12", condition: "Seminovo", storage: "128GB", color: "Dourado", price: 279900, batteryHealth: 86, warrantyMonths: 6, stock: 2, chip: "A14 Bionic", screen: '6,1" Super Retina XDR', camera: "12MP + 12MP + 12MP", battery: "2815 mAh", ram: "6GB" },
  { name: "iPhone 12", brand: "Apple", line: "iPhone 12", condition: "Seminovo", storage: "64GB", color: "Branco", price: 219900, oldPrice: 239900, batteryHealth: 90, warrantyMonths: 6, stock: 4, featured: true, chip: "A14 Bionic", screen: '6,1" Super Retina XDR', camera: "12MP + 12MP", battery: "2815 mAh", ram: "4GB" },
  { name: "iPhone 12 mini", brand: "Apple", line: "iPhone 12", condition: "Usado", storage: "64GB", color: "Verde", price: 179900, batteryHealth: 84, warrantyMonths: 3, stock: 2, chip: "A14 Bionic", screen: '5,4" Super Retina XDR', camera: "12MP + 12MP", battery: "2227 mAh", ram: "4GB" },
  { name: "iPhone 11 Pro Max", brand: "Apple", line: "iPhone 11", condition: "Seminovo", storage: "64GB", color: "Cinza Espacial", price: 239900, batteryHealth: 85, warrantyMonths: 6, stock: 2, chip: "A13 Bionic", screen: '6,5" Super Retina XDR', camera: "12MP + 12MP + 12MP", battery: "3969 mAh", ram: "4GB" },
  { name: "iPhone 11 Pro", brand: "Apple", line: "iPhone 11", condition: "Usado", storage: "64GB", color: "Prateado", price: 199900, batteryHealth: 83, warrantyMonths: 3, stock: 3, chip: "A13 Bionic", screen: '5,8" Super Retina XDR', camera: "12MP + 12MP + 12MP", battery: "3046 mAh", ram: "4GB" },
  { name: "iPhone 11", brand: "Apple", line: "iPhone 11", condition: "Seminovo", storage: "128GB", color: "Preto", price: 189900, oldPrice: 209900, batteryHealth: 89, warrantyMonths: 6, stock: 5, featured: true, badge: "Entrada iPhone", chip: "A13 Bionic", screen: '6,1" Liquid Retina HD', camera: "12MP + 12MP", battery: "3110 mAh", ram: "4GB" },
  { name: "iPhone 11", brand: "Apple", line: "iPhone 11", condition: "Usado", storage: "64GB", color: "Vermelho", price: 159900, batteryHealth: 82, warrantyMonths: 3, stock: 4, chip: "A13 Bionic", screen: '6,1" Liquid Retina HD', camera: "12MP + 12MP", battery: "3110 mAh", ram: "4GB" },

  // ---------- XIAOMI ----------
  { name: "Xiaomi 14", brand: "Xiaomi", line: "Xiaomi Flagship", condition: "Novo", storage: "512GB", color: "Preto", price: 649900, warrantyMonths: 12, stock: 2, featured: true, badge: "Leica", chip: "Snapdragon 8 Gen 3", screen: '6,36" LTPO AMOLED 120Hz', camera: "50MP Leica + 50MP + 50MP", battery: "4610 mAh", ram: "12GB" },
  { name: "Xiaomi 13T Pro", brand: "Xiaomi", line: "Xiaomi Flagship", condition: "Novo", storage: "512GB", color: "Azul", price: 349900, oldPrice: 389900, warrantyMonths: 12, stock: 3, chip: "Dimensity 9200+", screen: '6,67" AMOLED 144Hz', camera: "50MP + 50MP + 12MP", battery: "5000 mAh", ram: "12GB" },
  { name: "Redmi Note 13 Pro+ 5G", brand: "Xiaomi", line: "Redmi Note", condition: "Novo", storage: "512GB", color: "Roxo", price: 249900, oldPrice: 279900, warrantyMonths: 12, stock: 4, featured: true, chip: "Dimensity 7200 Ultra", screen: '6,67" AMOLED curva 120Hz', camera: "200MP + 8MP + 2MP", battery: "5000 mAh", ram: "12GB" },
  { name: "Redmi Note 13 Pro", brand: "Xiaomi", line: "Redmi Note", condition: "Novo", storage: "256GB", color: "Verde", price: 189900, warrantyMonths: 12, stock: 6, chip: "Snapdragon 7s Gen 2", screen: '6,67" AMOLED 120Hz', camera: "200MP + 8MP + 2MP", battery: "5100 mAh", ram: "8GB" },
  { name: "Redmi Note 13", brand: "Xiaomi", line: "Redmi Note", condition: "Novo", storage: "128GB", color: "Azul Gelo", price: 129900, oldPrice: 149900, warrantyMonths: 12, stock: 8, badge: "Mais vendido", chip: "Snapdragon 685", screen: '6,67" AMOLED 120Hz', camera: "108MP + 8MP + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Redmi Note 12", brand: "Xiaomi", line: "Redmi Note", condition: "Seminovo", storage: "128GB", color: "Cinza", price: 99900, warrantyMonths: 6, stock: 3, chip: "Snapdragon 685", screen: '6,67" AMOLED 120Hz', camera: "50MP + 8MP + 2MP", battery: "5000 mAh", ram: "6GB" },
  { name: "Redmi 13C", brand: "Xiaomi", line: "Redmi", condition: "Novo", storage: "256GB", color: "Preto Meia-noite", price: 89900, warrantyMonths: 12, stock: 10, chip: "Helio G85", screen: '6,74" HD+ 90Hz', camera: "50MP + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Redmi A3", brand: "Xiaomi", line: "Redmi", condition: "Novo", storage: "64GB", color: "Verde", price: 64900, warrantyMonths: 12, stock: 12, badge: "Entrada", chip: "Helio G36", screen: '6,71" HD+ 90Hz', camera: "8MP + 0,08MP", battery: "5000 mAh", ram: "4GB" },

  // ---------- POCO ----------
  { name: "Poco F6", brand: "Poco", line: "Poco F", condition: "Novo", storage: "512GB", color: "Preto", price: 279900, oldPrice: 309900, warrantyMonths: 12, stock: 3, featured: true, badge: "Gamer", chip: "Snapdragon 8s Gen 3", screen: '6,67" AMOLED 120Hz', camera: "50MP OIS + 8MP", battery: "5000 mAh", ram: "12GB" },
  { name: "Poco X6 Pro 5G", brand: "Poco", line: "Poco X", condition: "Novo", storage: "512GB", color: "Amarelo", price: 229900, warrantyMonths: 12, stock: 4, featured: true, chip: "Dimensity 8300 Ultra", screen: '6,67" AMOLED 120Hz', camera: "64MP OIS + 8MP + 2MP", battery: "5000 mAh", ram: "12GB" },
  { name: "Poco X6 5G", brand: "Poco", line: "Poco X", condition: "Novo", storage: "256GB", color: "Azul", price: 169900, warrantyMonths: 12, stock: 5, chip: "Snapdragon 7s Gen 2", screen: '6,67" AMOLED 120Hz', camera: "64MP OIS + 8MP + 2MP", battery: "5100 mAh", ram: "8GB" },
  { name: "Poco X5 Pro 5G", brand: "Poco", line: "Poco X", condition: "Seminovo", storage: "256GB", color: "Preto", price: 119900, warrantyMonths: 6, stock: 2, chip: "Snapdragon 778G", screen: '6,67" AMOLED 120Hz', camera: "108MP + 8MP + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Poco M6 Pro", brand: "Poco", line: "Poco M", condition: "Novo", storage: "256GB", color: "Roxo", price: 119900, warrantyMonths: 12, stock: 6, chip: "Helio G99 Ultra", screen: '6,67" AMOLED 120Hz', camera: "64MP OIS + 8MP + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Poco C65", brand: "Poco", line: "Poco C", condition: "Novo", storage: "128GB", color: "Azul", price: 79900, warrantyMonths: 12, stock: 9, chip: "Helio G85", screen: '6,74" HD+ 90Hz', camera: "50MP + 2MP + 0,08MP", battery: "5000 mAh", ram: "6GB" },

  // ---------- MOTOROLA ----------
  { name: "Motorola Edge 50 Ultra", brand: "Motorola", line: "Edge", condition: "Novo", storage: "512GB", color: "Madeira", price: 429900, warrantyMonths: 12, stock: 2, featured: true, chip: "Snapdragon 8s Gen 3", screen: '6,7" pOLED 144Hz', camera: "50MP + 64MP + 50MP", battery: "4500 mAh", ram: "16GB" },
  { name: "Motorola Edge 50 Fusion", brand: "Motorola", line: "Edge", condition: "Novo", storage: "256GB", color: "Azul", price: 219900, oldPrice: 249900, warrantyMonths: 12, stock: 5, featured: true, chip: "Snapdragon 6 Gen 3", screen: '6,7" pOLED 144Hz', camera: "50MP OIS + 13MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Motorola Edge 40 Neo", brand: "Motorola", line: "Edge", condition: "Seminovo", storage: "256GB", color: "Verde", price: 159900, warrantyMonths: 6, stock: 3, chip: "Dimensity 7030", screen: '6,55" pOLED 144Hz', camera: "50MP OIS + 13MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Moto G84 5G", brand: "Motorola", line: "Moto G", condition: "Novo", storage: "256GB", color: "Azul Marinho", price: 149900, warrantyMonths: 12, stock: 6, badge: "Mais vendido", chip: "Snapdragon 695", screen: '6,5" pOLED 120Hz', camera: "50MP OIS + 8MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Moto G54 5G", brand: "Motorola", line: "Moto G", condition: "Novo", storage: "256GB", color: "Grafite", price: 119900, warrantyMonths: 12, stock: 7, chip: "Dimensity 7020", screen: '6,5" IPS 120Hz', camera: "50MP + 8MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Moto G34 5G", brand: "Motorola", line: "Moto G", condition: "Novo", storage: "128GB", color: "Rosa", price: 99900, warrantyMonths: 12, stock: 8, chip: "Snapdragon 695", screen: '6,5" IPS 120Hz', camera: "50MP + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Moto G24", brand: "Motorola", line: "Moto G", condition: "Novo", storage: "128GB", color: "Verde", price: 79900, warrantyMonths: 12, stock: 10, chip: "Helio G85", screen: '6,56" IPS 90Hz', camera: "50MP + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Moto E14", brand: "Motorola", line: "Moto E", condition: "Novo", storage: "64GB", color: "Cinza", price: 59900, warrantyMonths: 12, stock: 12, badge: "Entrada", chip: "Unisoc T606", screen: '6,56" IPS 90Hz', camera: "13MP + 2MP", battery: "5000 mAh", ram: "4GB" },

  // ---------- REALME ----------
  { name: "Realme GT 6", brand: "Realme", line: "Realme GT", condition: "Novo", storage: "512GB", color: "Prata Fluido", price: 329900, warrantyMonths: 12, stock: 2, featured: true, badge: "Performance", chip: "Snapdragon 8s Gen 3", screen: '6,78" AMOLED 120Hz', camera: "50MP OIS + 8MP + 2MP", battery: "5500 mAh", ram: "12GB" },
  { name: "Realme 12 Pro+ 5G", brand: "Realme", line: "Realme 12", condition: "Novo", storage: "256GB", color: "Bege", price: 239900, warrantyMonths: 12, stock: 3, chip: "Snapdragon 7s Gen 2", screen: '6,7" AMOLED curva 120Hz', camera: "50MP + 64MP periscópio + 8MP", battery: "5000 mAh", ram: "12GB" },
  { name: "Realme 11 Pro 5G", brand: "Realme", line: "Realme 11", condition: "Seminovo", storage: "256GB", color: "Preto", price: 169900, warrantyMonths: 6, stock: 3, chip: "Dimensity 7050", screen: '6,7" AMOLED curva 120Hz', camera: "100MP OIS + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Realme C67", brand: "Realme", line: "Realme C", condition: "Novo", storage: "256GB", color: "Verde Sunny", price: 119900, warrantyMonths: 12, stock: 6, chip: "Snapdragon 685", screen: '6,72" IPS 120Hz', camera: "108MP + 2MP", battery: "5000 mAh", ram: "8GB" },
  { name: "Realme C55", brand: "Realme", line: "Realme C", condition: "Novo", storage: "128GB", color: "Preto", price: 99900, warrantyMonths: 12, stock: 7, chip: "Helio G88", screen: '6,72" IPS 90Hz', camera: "64MP + 2MP", battery: "5000 mAh", ram: "6GB" },
  { name: "Realme Note 50", brand: "Realme", line: "Realme Note", condition: "Novo", storage: "64GB", color: "Azul Céu", price: 64900, warrantyMonths: 12, stock: 10, badge: "Entrada", chip: "Unisoc T612", screen: '6,74" HD+ 90Hz', camera: "13MP + 0,08MP", battery: "5000 mAh", ram: "4GB" },
];

function buildDescription(row: Row) {
  const cond =
    row.condition === "Novo"
      ? "aparelho novo, lacrado, com nota fiscal e garantia da PHONESMART"
      : row.condition === "Seminovo"
        ? `aparelho seminovo revisado na bancada da PHONESMART, sem detalhes na tela${row.batteryHealth ? `, bateria em ${row.batteryHealth}% de saúde` : ""}`
        : `aparelho usado testado peça por peça pela PHONESMART${row.batteryHealth ? `, bateria em ${row.batteryHealth}% de saúde` : ""}`;
  return `${row.name} ${row.storage} na cor ${row.color}: ${cond}. Acompanha cabo, película e capa de brinde. Todos os aparelhos passam por checklist de 27 pontos (tela, touch, bateria, câmeras, faces/biometria, alto-falantes, chip e carregamento) antes de ir para a vitrine. Garantia de ${row.warrantyMonths ?? 3} meses e suporte técnico direto com quem conserta: a nossa própria assistência.`;
}

export const catalog: NewProduct[] = rows.map((row, index) => {
  const specs: SpecItem[] = [
    { label: "Processador", value: row.chip },
    { label: "Tela", value: row.screen },
    { label: "Câmeras", value: row.camera },
    { label: "Bateria", value: row.battery },
    { label: "Memória RAM", value: row.ram },
    { label: "Armazenamento", value: row.storage },
    { label: "Cor", value: row.color },
    { label: "Condição", value: row.condition },
  ];

  return {
    slug: slugify(`${row.name} ${row.storage} ${row.condition} ${index}`),
    name: row.name,
    brand: row.brand,
    line: row.line,
    condition: row.condition,
    storage: row.storage,
    color: row.color,
    price: row.price,
    oldPrice: row.oldPrice ?? null,
    batteryHealth: row.batteryHealth ?? null,
    warrantyMonths: row.warrantyMonths ?? 3,
    stock: row.stock ?? 1,
    featured: row.featured ?? false,
    badge: row.badge ?? null,
    rating: row.rating ?? 48,
    description: buildDescription(row),
    specs,
    imageUrl: PHOTOS[index % PHOTOS.length],
  } satisfies NewProduct;
});

export const services = [
  { icon: "📱", title: "Troca de tela / display", desc: "Telas originais e premium para iPhone, Xiaomi, Poco, Motorola e Realme.", price: "a partir de R$ 189", time: "1h a 3h" },
  { icon: "🔋", title: "Troca de bateria", desc: "Bateria nova com saúde 100% e teste de ciclo antes da entrega.", price: "a partir de R$ 149", time: "40 min" },
  { icon: "💧", title: "Reparo de placa e oxidação", desc: "Microssoldagem, limpeza ultrassônica e recuperação de aparelhos molhados.", price: "a partir de R$ 249", time: "24h a 72h" },
  { icon: "🔌", title: "Conector de carga", desc: "Não carrega ou carrega devagar? Trocamos o flex de carga no mesmo dia.", price: "a partir de R$ 129", time: "1h" },
  { icon: "📷", title: "Câmeras e Face ID", desc: "Câmera embaçada, com riscos ou Face ID inoperante — diagnóstico gratuito.", price: "a partir de R$ 169", time: "2h" },
  { icon: "🛡️", title: "Película 3D e capinhas", desc: "Aplicação profissional sem bolhas, com garantia contra trincas.", price: "a partir de R$ 39", time: "10 min" },
];

export const repairServiceOptions = [
  "Troca de tela / display",
  "Troca de bateria",
  "Reparo de placa / oxidação",
  "Conector de carga",
  "Câmera / Face ID",
  "Alto-falante ou microfone",
  "Atualização de software",
  "Diagnóstico geral",
  "Outro",
];
