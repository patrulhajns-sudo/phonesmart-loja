export const site = {
  name: "PHONESMART",
  tagline: "Assistência técnica e venda de celulares",
  phone: "(11) 98888-1234",
  whatsappNumber: "5511988881234",
  whatsappLink:
    "https://wa.me/5511988881234?text=Ol%C3%A1%2C%20PHONESMART!%20Vim%20pelo%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es.",
  email: "contato@phonesmart.com.br",
  address: "Av. Central, 1275 - Loja 04 - Centro",
  city: "São Paulo - SP",
  hours: [
    { day: "Segunda a Sexta", time: "09h às 19h" },
    { day: "Sábado", time: "09h às 15h" },
    { day: "Domingo e feriados", time: "Fechado (WhatsApp ativo)" },
  ],
  instagram: "@phonesmart.oficial",
  stats: [
    { value: "12 anos", label: "consertando celulares" },
    { value: "+18 mil", label: "aparelhos reparados" },
    { value: "90 dias", label: "de garantia no serviço" },
    { value: "4,9 ★", label: "avaliação dos clientes" },
  ],
};

export function whatsappFor(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
