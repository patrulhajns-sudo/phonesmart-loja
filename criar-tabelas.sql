-- ============================================================
--  PHONESMART - criacao das tabelas
--  COMO USAR: copie TUDO deste arquivo e cole no "SQL Editor"
--  do Neon (neon.tech), depois clique em "Run".
--  Nao precisa de terminal. Rode uma unica vez.
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id               serial PRIMARY KEY,
  slug             varchar(160) NOT NULL UNIQUE,
  name             varchar(160) NOT NULL,
  brand            varchar(40)  NOT NULL,
  line             varchar(60)  NOT NULL DEFAULT '',
  condition        varchar(20)  NOT NULL,
  storage          varchar(20)  NOT NULL DEFAULT '',
  color            varchar(40)  NOT NULL DEFAULT '',
  price            integer      NOT NULL,
  old_price        integer,
  battery_health   integer,
  warranty_months  integer      NOT NULL DEFAULT 3,
  stock            integer      NOT NULL DEFAULT 1,
  featured         boolean      NOT NULL DEFAULT false,
  badge            varchar(40),
  rating           integer      NOT NULL DEFAULT 50,
  description      text         NOT NULL DEFAULT '',
  specs            jsonb        NOT NULL DEFAULT '[]'::jsonb,
  image_url        text         NOT NULL DEFAULT '',
  created_at       timestamp    NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id               serial PRIMARY KEY,
  code             varchar(20)  NOT NULL UNIQUE,
  customer_name    varchar(120) NOT NULL,
  customer_phone   varchar(40)  NOT NULL,
  customer_email   varchar(160) NOT NULL DEFAULT '',
  city             varchar(120) NOT NULL DEFAULT '',
  delivery_method  varchar(40)  NOT NULL DEFAULT 'retirada',
  payment_method   varchar(40)  NOT NULL DEFAULT 'pix',
  note             text         NOT NULL DEFAULT '',
  total            integer      NOT NULL,
  status           varchar(30)  NOT NULL DEFAULT 'novo',
  created_at       timestamp    NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id          serial PRIMARY KEY,
  order_id    integer      NOT NULL,
  product_id  integer,
  name        varchar(160) NOT NULL,
  unit_price  integer      NOT NULL,
  quantity    integer      NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS repair_requests (
  id              serial PRIMARY KEY,
  protocol        varchar(20)  NOT NULL UNIQUE,
  customer_name   varchar(120) NOT NULL,
  customer_phone  varchar(40)  NOT NULL,
  device_brand    varchar(40)  NOT NULL,
  device_model    varchar(80)  NOT NULL,
  service_type    varchar(80)  NOT NULL,
  description     text         NOT NULL DEFAULT '',
  status          varchar(30)  NOT NULL DEFAULT 'aguardando',
  created_at      timestamp    NOT NULL DEFAULT now()
);

-- Pronto! Os 48 celulares entram sozinhos na primeira vez
-- que alguem abrir o site. Voce nao precisa cadastrar nada.
