export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function installments(cents: number, times = 12) {
  return formatBRL(Math.round((cents * 1.0) / times));
}

export function pixPrice(cents: number) {
  return formatBRL(Math.round(cents * 0.93));
}

export function formatDate(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}
