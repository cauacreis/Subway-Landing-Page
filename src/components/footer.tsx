"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Heart, Shield, Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#040905] border-t border-emerald-950/80 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src="/images/icons/subway_logo.png"
                alt="Subway®"
                width={130}
                height={34}
                className="h-8 w-auto object-contain group-hover:brightness-110 transition-all"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              A maior rede de sanduíches feitos sob medida do planeta, reinventada com ingredientes artesanais, pães assados a cada hora e cortes nobres grelhados.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Qualidade & Higiene Garantidas pelo Padrão Ouro</span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-2">
              Cardápio
            </span>
            <Link href="#signature" className="text-xs text-slate-400 hover:text-[#FFC20E] transition-colors">
              Signature Series
            </Link>
            <Link href="#subway-lab" className="text-xs text-slate-400 hover:text-[#FFC20E] transition-colors">
              Subway Lab (Monte o Seu)
            </Link>
            <Link href="#signature" className="text-xs text-slate-400 hover:text-[#FFC20E] transition-colors">
              Saladas & Bowls
            </Link>
            <Link href="#fresh" className="text-xs text-slate-400 hover:text-[#FFC20E] transition-colors">
              Pães & Massas
            </Link>
            <Link href="#app" className="text-xs text-slate-400 hover:text-[#FFC20E] transition-colors">
              Cookies & Sobremesas
            </Link>
          </div>

          {/* Quick Links 2 */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-2">
              Transparência
            </span>
            <a href="#nutricao" className="text-xs text-slate-400 hover:text-white transition-colors">
              Tabela Nutricional
            </a>
            <a href="#alergenicos" className="text-xs text-slate-400 hover:text-white transition-colors">
              Guia de Alergênicos
            </a>
            <a href="#sustentabilidade" className="text-xs text-slate-400 hover:text-white transition-colors">
              Origem dos Vegetais
            </a>
            <a href="#franquias" className="text-xs text-slate-400 hover:text-white transition-colors">
              Seja um Franqueado
            </a>
            <a href="#termos" className="text-xs text-slate-400 hover:text-white transition-colors">
              Privacidade & Termos
            </a>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFC20E] font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Clube VIP Fresh Secrets</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Receba cupons secretos de 40% OFF, lançamentos de receitas antes de todo mundo e convites para degustações exclusivas.
            </p>

            <form onSubmit={handleSubscribe} className="w-full flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail..."
                className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-yellow-300" />
                    <span>Inscrito!</span>
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Subway IP LLC. Subway® é uma marca registrada de Subway IP LLC. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Criado com obsessão por sabor e frescor</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
