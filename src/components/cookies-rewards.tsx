"use client";

import Image from "next/image";
import { Cookie, Star, Sparkles, Quote, Heart } from "lucide-react";

export default function CookiesRewards() {
  const testimonials = [
    {
      name: "Rafael Meneghetti",
      role: "Crítico Gastronômico & Food Hunter",
      comment:
        "O novo pão artesanal com crosta de queijo e os cortes nobres colocaram o Subway em outro patamar gastronômico. O B.M.T. com queijo fundido é espetacular.",
      rating: 5,
      avatar: "👨‍🍳",
      city: "São Paulo, SP",
    },
    {
      name: "Beatriz Lacerda",
      role: "Arquiteta de Interiores",
      comment:
        "A experiência de montar meu sanduíche personalizado com vegetais frescos e o molho de cebola agridoce é incomparável na correria do dia a dia. Chega sempre impecável.",
      rating: 5,
      avatar: "👩‍💻",
      city: "Curitiba, PR",
    },
    {
      name: "Lucas Pinheiro",
      role: "Designer de Produto",
      comment:
        "Os cookies quentinhos de chocolate triplo com aquela casquinha e centro derretido são sagrados depois de qualquer Sub. Impossível pedir um só!",
      rating: 5,
      avatar: "🎨",
      city: "Rio de Janeiro, RJ",
    },
  ];

  const cookieFlavors = [
    {
      name: "Chocolate Triplo Intenso",
      desc: "Massa amanteigada repleta de pedaços de chocolate meio amargo, ao leite e branco derretidos.",
      badge: "O Favorito",
    },
    {
      name: "Gotas de Chocolate com Castanhas",
      desc: "Castanhas nobres crocantes combinadas com gotas ricas de chocolate suíço.",
      badge: "Crocância Pura",
    },
    {
      name: "Aveia & Mel Silvestre",
      desc: "Aveia tostada no forno, toque sutil de canela e doçura pura do mel de florada.",
      badge: "Clássico Dourado",
    },
  ];

  return (
    <section className="py-28 relative bg-[#060e09] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#FFC20E]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: The Sweet Corner Hero */}
        <div className="double-bezel mb-24 relative overflow-hidden">
          <div className="double-bezel-inner p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 group">
              <Image
                src="/images/cookies.jpg"
                alt="Cookies artesanais recém-saídos do forno com chocolate derretido"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC20E]" />
                <span>Assados em Fornada Especial</span>
              </div>
            </div>

            {/* Copy & Flavors */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-500/20 text-[#FFC20E] text-xs font-semibold uppercase tracking-widest mb-4">
                <Cookie className="w-3.5 h-3.5" />
                <span>The Sweet Finale</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                O Grand Finale: Cookies Que Aquecem a Alma.
              </h3>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Dourados por fora, macios por dentro e com chocolate nobre que derrete a cada mordida. O complemento indispensável de cada pedido.
              </p>

              <div className="flex flex-col gap-3 w-full mb-8">
                {cookieFlavors.map((cookie, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="font-bold text-sm text-white block">{cookie.name}</span>
                      <span className="text-xs text-slate-400">{cookie.desc}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-yellow-400/10 text-[#FFC20E] border border-yellow-400/20 font-semibold shrink-0">
                      {cookie.badge}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Combo Sweet (Sub + Cookie + Bebida):</span>
                <span className="text-sm font-bold text-emerald-400">Vantagem Exclusiva no App</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Social Proof & Rave Reviews */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>A Voz de Quem Ama o Frescor</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mais de 2 Milhões de Sanduíches Criados por Mês
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="double-bezel group hover:border-emerald-500/30">
                <div className="double-bezel-inner p-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4 text-[#FFC20E]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC20E]" />
                      ))}
                    </div>

                    <Quote className="w-6 h-6 text-emerald-500/30 mb-2" />

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-lg">
                      {t.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white leading-snug">{t.name}</span>
                      <span className="text-[11px] text-slate-400">{t.role}</span>
                      <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5">
                        {t.city} • Compra Verificada
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
