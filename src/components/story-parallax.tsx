"use client";

import Image from "next/image";
import { Leaf, Sun, Award, Droplets, CheckCircle2 } from "lucide-react";

export default function StoryParallax() {
  const commitments = [
    {
      icon: Leaf,
      title: "100% Fazendas Locais",
      desc: "Vegetais selecionados colhidos de produtores certificados e entregues todas as manhãs.",
      stat: "24h",
      statLabel: "Da colheita ao balcão",
    },
    {
      icon: Sun,
      title: "Pães Assados de Hora em Hora",
      desc: "Fornadas contínuas para garantir casca estaladiça e miolo perfumado a qualquer momento do dia.",
      stat: "60min",
      statLabel: "Ciclo de nova fornada",
    },
    {
      icon: Droplets,
      title: "Zero Conservantes Artificiais",
      desc: "Nossos molhos e temperos utilizam azeite extravirgem, pimentas naturais e ervas aromáticas.",
      stat: "0%",
      statLabel: "Aromas sintéticos",
    },
    {
      icon: Award,
      title: "Cortes de Alta Gastronomia",
      desc: "Carnes inspecionadas, curas tradicionais e carnes desfiadas seladas com máxima suculência.",
      stat: "100%",
      statLabel: "Origem inspecionada",
    },
  ];

  return (
    <section id="fresh" className="py-28 relative overflow-hidden bg-[#050c07]">
      {/* Background Floating Ingredients Banner with subtle parallax styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="double-bezel relative overflow-hidden">
          <div className="double-bezel-inner relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <Image
              src="/images/floating.jpg"
              alt="Explosão de ingredientes frescos em gravidade zero"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center brightness-90 hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060e09] via-black/40 to-transparent pointer-events-none" />

            {/* In-image narrative overlay */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 max-w-2xl">
              <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                Onde o frescor não é promessa, é a nossa obsessão.
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm mt-2 hidden sm:block">
                Em cada mordida, a vibração crocante do pimentão verde, a doçura natural do tomate italiano e a maciez inconfundível do pão recém-saído do forno.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="double-bezel group hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="double-bezel-inner p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#FFC20E]" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{c.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-white group-hover:text-[#FFC20E] transition-colors">
                        {c.stat}
                      </span>
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">
                        {c.statLabel}
                      </span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
