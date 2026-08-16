import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsappFab } from "@/components/WhatsappFab";
import "./globals.css";

export const metadata: Metadata = {
  title: "PHONESMART | Assistência técnica e venda de celulares",
  description:
    "PHONESMART: conserto de celulares e venda de iPhones novos e seminovos, Xiaomi, Poco, Motorola e Realme. Garantia real e assistência própria.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-neutral-900 antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsappFab />
        </CartProvider>
      </body>
    </html>
  );
}
