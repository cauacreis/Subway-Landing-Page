"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, Clock, Award } from "lucide-react";

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#FFC20E]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
              Fresco como a vida{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FFC20E] via-yellow-200 to-[#FFB300]">
                deve ser.
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#008C15] to-[#FFC20E] rounded-full opacity-80" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
              Pães artesanais assados de hora em hora, cortes nobres defumados na brasa, queijos derretidos e vegetais colhidos na estação. Redefinimos o conceito de sabor sob medida.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <Link
                href="#subway-lab"
                className="inline-flex items-center justify-between gap-4 pl-7 pr-3 py-4 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] hover:to-[#008C15] text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(0,140,21,0.4)] hover:shadow-[0_0_45px_rgba(0,140,21,0.6)] transition-all group active:scale-[0.98]"
              >
                <span>Crie no Subway Lab</span>
                <div className="w-9 h-9 rounded-full bg-black/25 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 text-yellow-300" />
                </div>
              </Link>

              <Link
                href="#signature"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                <Flame className="w-4 h-4 text-[#FFC20E]" />
                <span>Explorar Coleção</span>
              </Link>
            </div>

            {/* Micro Metrics Island */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#FFC20E] font-bold text-lg">
                  <Award className="w-4 h-4" />
                  <span>4.9 / 5</span>
                </div>
                <span className="text-[11px] text-slate-400">Avaliação do público</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-lg">
                  <Clock className="w-4 h-4" />
                  <span>15 min</span>
                </div>
                <span className="text-[11px] text-slate-400">Preparo & entrega</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400 font-bold text-lg">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100%</span>
                </div>
                <span className="text-[11px] text-slate-400">Frescor certificado</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Perspective Hero Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-[#FFC20E]/15 rounded-3xl blur-3xl -z-10" />

            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="double-bezel w-full max-w-lg lg:max-w-none relative cursor-grab active:cursor-grabbing group select-none"
            >
              <div className="double-bezel-inner relative overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="/images/hero.jpg"
                  alt="Subway Signature Series Hero Sandwich"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Bottom Card Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/10">
                  <div>
                    <span className="text-xs text-emerald-400 font-mono font-medium block">
                      Subway Series #01
                    </span>
                    <h2 className="text-white font-bold text-sm sm:text-base">
                      The Artisan Supreme Sub
                    </h2>
                  </div>
                  <span className="text-[#FFC20E] font-extrabold text-base sm:text-lg">
                    R$ 38,90
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
