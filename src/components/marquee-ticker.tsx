export default function MarqueeTicker() {
  const items = [
    "PÃES ARTESANAIS ASSADOS A CADA HORA",
    "VEGETAIS 100% FRESCOS CORTADOS NO DIA",
    "CORTES NOBRES DEFUMADOS NA BRASA",
    "MOLHOS ASSINATURA EXCLUSIVOS",
    "COOKIES QUENTES COM GOTAS DE CHOCOLATE TRIPLO",
    "QUEIJO FUNDIDO NA HORA",
    "MONTE DO SEU JEITO NO SUBWAY LAB",
    "ENTREGA ULTRA-RÁPIDA EM ATÉ 20 MINUTOS",
  ];

  return (
    <div className="relative w-full py-4 bg-[#0a180e] border-y border-emerald-500/20 overflow-hidden select-none z-20 shadow-[0_0_30px_rgba(0,140,21,0.15)]">
      {/* Edge gradient fades for smooth infinite transition */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#060e09] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#060e09] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-extrabold tracking-widest uppercase font-mono">
        {/* Repeating sequence twice for seamless loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span
              className={
                idx % 2 === 0
                  ? "text-white hover:text-[#FFC20E] transition-colors"
                  : "text-emerald-400 hover:text-white transition-colors"
              }
            >
              {text}
            </span>
            <span className="text-[#FFC20E] text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
