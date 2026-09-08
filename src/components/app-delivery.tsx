"use client";

import { useState } from "react";
import Image from "next/image";
import { Smartphone, Gift, Bike, Copy, Check, Star, ArrowUpRight } from "lucide-react";

export default function AppDelivery() {
  const [copied, setCopied] = useState(false);

  const copyCoupon = () => {
    navigator.clipboard.writeText("EATFRESH30");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const appFeatures = [
    {
      icon: Bike,
      title: "Rastreamento em Tempo Real",
      desc: "Acompanhe seu Sub sendo montado na chapa, saindo do forno e a rota do entregador até seu portão.",
    },
    {
      icon: Gift,
      title: "SubClub™ Gold Rewards",
      desc: "Ganhe pontos a cada mordida. Acumule e troque por cookies quentes, adicionais de queijo ou subs de 30cm.",
    },
    {
      icon: Smartphone,
      title: "Click & Collect Expresso",
      desc: "Personalize e pague no app antes de sair de casa. Chegue na loja e retire na prateleira VIP sem fila.",
    },
  ];

  return (
    <section id="app" className="py-28 relative bg-[#07130b] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Isometric App Mockup Photo with spatial tilt */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="double-bezel max-w-md w-full relative group">
              <div className="double-bezel-inner relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden">
                <Image
                  src="/images/app.jpg"
                  alt="Subway App Delivery & SubClub Rewards em iPhone"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating pill over image */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#03230c] border border-emerald-500/40 flex items-center justify-center p-1.5 shadow-[0_4px_12px_rgba(0,140,21,0.4)] shrink-0">
                      <Image
                        src="/images/icons/subway_symbol.png"
                        alt="Subway App"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-white font-bold text-xs block">
                        SubClub Rewards Ativado
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        +150 pontos acumulados hoje
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                    VIP GOLD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting, Benefits, Coupon */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              O Subway do seu bolso com{" "}
              <span className="text-[#FFC20E]">30% OFF</span> no 1º Pedido.
            </h2>

            <p className="text-slate-300 text-base mb-8 max-w-lg leading-relaxed">
              Baixe o aplicativo oficial, personalize seus subs com um toque, salve suas receitas secretas e receba onde estiver com entrega expressa.
            </p>

            {/* Feature List */}
            <div className="flex flex-col gap-4 w-full mb-8">
              {appFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#FFC20E] shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{f.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Copyable Coupon Box */}
            <div className="p-4 rounded-2xl bg-black/50 border border-yellow-500/30 w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Cupom de Boas-Vindas:</span>
                <span className="font-mono font-bold text-base text-[#FFC20E] bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
                  EATFRESH30
                </span>
              </div>
              <button
                onClick={copyCoupon}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copiar Cupom</span>
                  </>
                )}
              </button>
            </div>

            {/* App Store Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#app-download"
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center gap-3 transition-all group active:scale-95"
              >
                <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/icons/apple-store.png"
                    alt="App Store"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">
                    Disponível na
                  </span>
                  <span className="text-xs font-bold leading-none">App Store</span>
                </div>
              </a>

              <a
                href="#app-download"
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center gap-3 transition-all group active:scale-95"
              >
                <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/icons/google-play.png"
                    alt="Google Play"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">
                    Disponível no
                  </span>
                  <span className="text-xs font-bold leading-none">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
