import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://subway.com.br"),
  title: "Subway® — Fresh Reinvented | Campanha Signature & Subway Lab",
  description:
    "Descubra o novo Subway: Pães artesanais assados a cada hora, cortes nobres defumados, queijos fundidos e vegetais 100% frescos. Monte o seu no Subway Lab com experiência interativa.",
  keywords: ["Subway", "Subway Brasil", "Sanduíche Artesanal", "Monte o Seu", "Eat Fresh", "Subway Series"],
  openGraph: {
    title: "Subway® — Fresh Reinvented",
    description: "A nova era do sabor artesanal e ingredientes frescos. Monte o seu agora.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060e09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${syne.variable} dark scroll-smooth`}>
      <body className="font-sans antialiased bg-[#060e09] text-slate-100 min-h-screen relative overflow-x-hidden selection:bg-[#008C15] selection:text-white">
        {/* Ambient subtle noise texture */}
        <div className="fixed inset-0 pointer-events-none z-50 grain-overlay opacity-40" />

        {/* Global radial lighting */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
        <div className="fixed top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#FFC20E]/5 blur-[160px] pointer-events-none -z-10 rounded-full" />

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
