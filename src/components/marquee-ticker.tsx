"use client";

import { ArrowUpRight } from "lucide-react";

interface TickerItem {
  text: string;
  targetId: string;
  kioskCategory?: "bread" | "protein" | "cheese" | "veggies" | "sauce" | "combo";
  hint: string;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    text: "PÃES ARTESANAIS ASSADOS A CADA HORA",
    targetId: "subway-lab",
    kioskCategory: "bread",
    hint: "Personalizar Pães no Totem",
  },
  {
    text: "VEGETAIS 100% FRESCOS CORTADOS NO DIA",
    targetId: "fresh",
    hint: "Conhecer Origem e Frescor",
  },
  {
    text: "CORTES NOBRES DEFUMADOS NA BRASA",
    targetId: "signature",
    hint: "Ver Coleção Signature",
  },
  {
    text: "MOLHOS ASSINATURA EXCLUSIVOS",
    targetId: "subway-lab",
    kioskCategory: "sauce",
    hint: "Escolher Molhos no Totem",
  },
  {
    text: "COOKIES QUENTES COM GOTAS DE CHOCOLATE TRIPLO",
    targetId: "cookies",
    hint: "Ver Fornada de Cookies",
  },
  {
    text: "QUEIJO FUNDIDO NA HORA",
    targetId: "subway-lab",
    kioskCategory: "cheese",
    hint: "Escolher Queijo & Ponto do Forno",
  },
  {
    text: "MONTE DO SEU JEITO NO SUBWAY LAB",
    targetId: "subway-lab",
    hint: "Abrir Totem Kiosk",
  },
  {
    text: "ENTREGA ULTRA-RÁPIDA EM ATÉ 20 MINUTOS",
    targetId: "app",
    hint: "Baixar App & Pedir Delivery",
  },
];

export default function MarqueeTicker() {
  const handleItemClick = (item: TickerItem) => {
    const el = document.getElementById(item.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (item.kioskCategory) {
      window.dispatchEvent(
        new CustomEvent("subway:set-kiosk-category", {
          detail: item.kioskCategory,
        })
      );
    }
  };

  return (
    <div className="relative w-full py-3.5 bg-[#0a180e] border-y border-emerald-500/20 overflow-hidden select-none z-20 shadow-[0_0_30px_rgba(0,140,21,0.15)] group">
      {/* Edge gradient fades for smooth infinite transition */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#060e09] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#060e09] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6 text-xs sm:text-sm font-extrabold tracking-widest uppercase font-mono">
        {/* Repeating sequence twice for seamless loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => handleItemClick(item)}
              title={item.hint}
              className="group/item inline-flex items-center gap-2 py-1 px-3 rounded-full border border-transparent hover:border-yellow-400/40 hover:bg-black/60 hover:shadow-[0_0_15px_rgba(255,194,14,0.25)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-left"
            >
              <span
                className={
                  idx % 2 === 0
                    ? "text-white group-hover/item:text-[#FFC20E] transition-colors"
                    : "text-emerald-400 group-hover/item:text-[#FFC20E] transition-colors"
                }
              >
                {item.text}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FFC20E] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0" />
            </button>
            <span className="text-[#FFC20E] text-xs select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
