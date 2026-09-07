"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Check,
  ChevronRight,
  Flame,
  Zap,
  ShoppingBag,
  Smartphone,
  QrCode,
  ArrowRight,
  RotateCcw,
  Plus,
  Minus,
  Clock,
  Copy,
  ExternalLink,
  ChevronLeft,
  X,
  Share2,
} from "lucide-react";

interface KioskOption {
  id: string;
  name: string;
  desc: string;
  image: string;
  cal: number;
  protein: number;
  price: number;
  badge?: string;
  category: "bread" | "protein" | "cheese" | "veggies" | "sauce" | "combo";
}

const KIOSK_BREADS: KioskOption[] = [
  {
    id: "parmesan-oregano",
    name: "Parmesão & Orégano",
    desc: "Crostinha crocante de parmesão ralado e ervas aromáticas assadas na hora",
    image: "/images/kiosk/bread_parmesan.jpg",
    cal: 210,
    protein: 9,
    price: 0,
    badge: "Mais Pedido",
    category: "bread",
  },
  {
    id: "italian-white",
    name: "Italiano Branco Tradicional",
    desc: "Massa leve de fermentação natural com casca crocante e miolo macio",
    image: "/images/kiosk/bread_italian.jpg",
    cal: 190,
    protein: 7,
    price: 0,
    category: "bread",
  },
  {
    id: "nine-grain",
    name: "9 Grãos com Sementes",
    desc: "Farinha 100% integral com flocos de aveia e linhaça dourada",
    image: "/images/kiosk/bread_nine_grain.jpg",
    cal: 200,
    protein: 10,
    price: 1.5,
    badge: "Rico em Fibras",
    category: "bread",
  },
  {
    id: "three-cheese",
    name: "Três Queijos Gratinado",
    desc: "Massa especial coberta com crosta de cheddar, provolone e parmesão",
    image: "/images/kiosk/bread_three_cheese.jpg",
    cal: 240,
    protein: 12,
    price: 2.5,
    badge: "Extra Queijo",
    category: "bread",
  },
];

const KIOSK_PROTEINS: KioskOption[] = [
  {
    id: "bmt-trio",
    name: "Trio B.M.T.® Italiano",
    desc: "Salame italiano com especiarias nobres, pepperoni picante e fatias de presunto tenro",
    image: "/images/bmt.jpg",
    cal: 280,
    protein: 24,
    price: 24.9,
    badge: "Clássico Supremo",
    category: "protein",
  },
  {
    id: "chicken-teriyaki",
    name: "Frango Teriyaki Suculento",
    desc: "Tiras de peito de frango grelhadas salteadas no molho oriental agridoce e caramelizado",
    image: "/images/teriyaki.jpg",
    cal: 210,
    protein: 26,
    price: 23.9,
    badge: "Favorito do Chef",
    category: "protein",
  },
  {
    id: "shaved-angus",
    name: "Shaved Angus Steak Chapa",
    desc: "Corte bovino Angus fatiado fininho, salteado com pimenta preta e cebolas",
    image: "/images/steak.jpg",
    cal: 290,
    protein: 29,
    price: 28.9,
    badge: "Corte Nobre",
    category: "protein",
  },
  {
    id: "veggie-falafel",
    name: "Falafel & Grão-de-Bico",
    desc: "Medalhões dourados crocantes com tahine, cominho, salsa fresca e raspas de limão",
    image: "/images/veggie.jpg",
    cal: 180,
    protein: 14,
    price: 21.9,
    badge: "100% Plant-Based",
    category: "protein",
  },
];

const KIOSK_CHEESES = [
  {
    id: "cheddar-melt",
    name: "Cheddar Melt Cremoso",
    desc: "Cheddar inglês derretido na chapa quente com textura aveludada",
    image: "/images/kiosk/cheese_cheddar.jpg",
    cal: 90,
    protein: 5,
    price: 0,
    badge: "Derretimento Perfeito",
  },
  {
    id: "provolone-artisan",
    name: "Provolone Artesanal Curado",
    desc: "Fatias finas com toque amanteigado e aroma suave defumado",
    image: "/images/kiosk/cheese_provolone.jpg",
    cal: 80,
    protein: 6,
    price: 0,
  },
  {
    id: "mozzarella-fresh",
    name: "Mozzarella Especial",
    desc: "Sabor suave e elasticidade perfeita ao aquecer no forno",
    image: "/images/kiosk/cheese_mozzarella.jpg",
    cal: 70,
    protein: 6,
    price: 0,
  },
  {
    id: "no-cheese",
    name: "Sem Queijo",
    desc: "Foco total na proteína e no frescor natural dos vegetais",
    image: "",
    cal: 0,
    protein: 0,
    price: 0,
  },
];

const KIOSK_VEGGIES = [
  {
    id: "lettuce",
    name: "Alface Americana",
    desc: "Tiras frescas e crocantes da horta",
    image: "/images/kiosk/veggie_lettuce.jpg",
    cal: 10,
    icon: "🥬",
  },
  {
    id: "tomato",
    name: "Tomate Caqui",
    desc: "Fatias maduras suculentas e aromáticas",
    image: "/images/kiosk/veggie_tomato.jpg",
    cal: 15,
    icon: "🍅",
  },
  {
    id: "onion",
    name: "Cebola Roxa",
    desc: "Anéis crocantes com leve picância",
    image: "/images/kiosk/veggie_onion.jpg",
    cal: 10,
    icon: "🧅",
  },
  {
    id: "pickles",
    name: "Picles Crocante",
    desc: "Pepino agridoce em conserva artesanal",
    image: "/images/kiosk/veggie_pickles.jpg",
    cal: 10,
    icon: "🥒",
  },
  {
    id: "olives",
    name: "Azeitonas Pretas",
    desc: "Rodelas fatiadas ricas em sabor",
    image: "/images/kiosk/veggie_olives.jpg",
    cal: 20,
    icon: "🫒",
  },
  {
    id: "jalapeno",
    name: "Jalapeño Mexicano",
    desc: "Toque picante autêntico para quem ama sabor",
    image: "/images/kiosk/veggie_jalapeno.jpg",
    cal: 5,
    icon: "🌶️",
  },
  {
    id: "peppers",
    name: "Pimentão Verde",
    desc: "Tiras frescas colhidas e fatiadas do dia",
    image: "/images/kiosk/veggie_peppers.jpg",
    cal: 10,
    icon: "🫑",
  },
];

const KIOSK_SAUCES = [
  {
    id: "sweet-onion",
    name: "Cebola Agridoce Secreta",
    desc: "O molho assinatura icônico Subway, aroma caramelizado e adocicado",
    image: "/images/kiosk/sauce_sweet_onion.jpg",
    cal: 45,
    badge: "Assinatura",
  },
  {
    id: "chipotle-smoke",
    name: "Chipotle Defumado",
    desc: "Pimenta chipotle mexicana defumada com emulsão cremosa",
    image: "/images/kiosk/sauce_chipotle.jpg",
    cal: 90,
    badge: "Picante",
  },
  {
    id: "honey-mustard",
    name: "Mostarda e Mel Silvestre",
    desc: "Mostarda dijon com grãos rústicos harmonizada com mel puro",
    image: "/images/kiosk/sauce_honey_mustard.jpg",
    cal: 60,
  },
  {
    id: "green-mayo",
    name: "Maionese Verde com Ervas",
    desc: "Cebolinha fresca, salsa e raspas cítricas de limão siciliano",
    image: "/images/kiosk/sauce_green_mayo.jpg",
    cal: 85,
  },
];

const COMBOS = [
  {
    id: "combo-full",
    name: "Turbinar com Combo Completo",
    desc: "Refrigerante Refil 500ml geladinho + Cookie Artesanal Choco Chunk",
    image: "/images/kiosk/combo_full.jpg",
    price: 11.9,
    badge: "Economize R$ 5,00",
    cal: 380,
  },
  {
    id: "combo-drink",
    name: "Apenas Bebida Refil 500ml",
    desc: "Coca-Cola, Guaraná Antarctica ou Suco Del Valle com refil livre",
    image: "/images/drink.jpg",
    price: 6.9,
    cal: 150,
  },
  {
    id: "combo-cookie",
    name: "Apenas Cookie Quentinho",
    desc: "Assado na loja com gotas gigantes de chocolate ao leite",
    image: "/images/cookies.jpg",
    price: 5.9,
    cal: 230,
  },
  {
    id: "no-combo",
    name: "Apenas o Sanduíche",
    desc: "Sem acompanhamentos extras nesta comanda",
    image: "/images/bmt.jpg",
    price: 0,
    cal: 0,
  },
];

export default function SubBuilder({
  onAddCustomSub,
}: {
  onAddCustomSub?: (customSub: any) => void;
}) {
  // Totem States
  const [orderType, setOrderType] = useState<"comer-aqui" | "levar">("comer-aqui");
  const [size, setSize] = useState<"15cm" | "30cm">("15cm");
  const [activeCategory, setActiveCategory] = useState<
    "bread" | "protein" | "cheese" | "veggies" | "sauce" | "combo"
  >("bread");

  const [selectedBread, setSelectedBread] = useState(KIOSK_BREADS[0]);
  const [selectedProtein, setSelectedProtein] = useState(KIOSK_PROTEINS[0]);
  const [selectedCheese, setSelectedCheese] = useState(KIOSK_CHEESES[0]);
  const [toasting, setToasting] = useState<"tostado" | "frio" | "extra">("tostado");
  const [selectedVeggies, setSelectedVeggies] = useState<Record<string, "none" | "normal" | "extra">>({
    lettuce: "normal",
    tomato: "normal",
    onion: "normal",
    pickles: "normal",
    olives: "none",
    jalapeno: "none",
    peppers: "none",
  });
  const [selectedSauces, setSelectedSauces] = useState<string[]>(["sweet-onion"]);
  const [selectedCombo, setSelectedCombo] = useState(COMBOS[0]);

  // Modal / Kiosk Checkout States
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(427);
  const [isCopied, setIsCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("16:20");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Veggie cycle handler (None -> Normal -> Extra -> None)
  const cycleVeggie = (id: string) => {
    const current = selectedVeggies[id] || "none";
    let next: "none" | "normal" | "extra" = "normal";
    if (current === "none") next = "normal";
    else if (current === "normal") next = "extra";
    else next = "none";

    setSelectedVeggies((prev) => ({ ...prev, [id]: next }));
  };

  // Sauce multi-select handler (up to 3)
  const toggleSauce = (id: string) => {
    if (selectedSauces.includes(id)) {
      if (selectedSauces.length > 1) {
        setSelectedSauces(selectedSauces.filter((s) => s !== id));
      }
    } else {
      if (selectedSauces.length < 3) {
        setSelectedSauces([...selectedSauces, id]);
      } else {
        setSelectedSauces([...selectedSauces.slice(1), id]);
      }
    }
  };

  // Calculations
  const sizeMultiplier = size === "30cm" ? 1.8 : 1;
  const calMultiplier = size === "30cm" ? 2 : 1;
  const activeVeggiesCount = Object.values(selectedVeggies).filter((v) => v !== "none").length;

  const basePrice = selectedProtein.price * sizeMultiplier;
  const breadPrice = selectedBread.price * sizeMultiplier;
  const comboPrice = selectedCombo.price;
  const totalPrice = basePrice + breadPrice + comboPrice;

  const totalCalories = Math.round(
    (selectedBread.cal +
      selectedProtein.cal +
      selectedCheese.cal +
      activeVeggiesCount * 12 +
      selectedSauces.length * 50) *
      calMultiplier +
      selectedCombo.cal
  );

  const categories = [
    { id: "bread", label: "1. Pão & Tamanho", icon: "🥖", activeDesc: `${size} • ${selectedBread.name}` },
    { id: "protein", label: "2. Recheio", icon: "🥩", activeDesc: selectedProtein.name },
    { id: "cheese", label: "3. Queijo & Forno", icon: "🧀", activeDesc: `${selectedCheese.name} (${toasting})` },
    { id: "veggies", label: "4. Saladas", icon: "🥗", activeDesc: `${activeVeggiesCount} selecionados` },
    { id: "sauce", label: "5. Molhos", icon: "💧", activeDesc: `${selectedSauces.length} selecionados` },
    { id: "combo", label: "6. Turbine seu Combo", icon: "🥤", activeDesc: selectedCombo.name },
  ];

  const handleOpenAppModal = () => {
    setOrderNumber(Math.floor(100 + Math.random() * 900));
    setIsAppModalOpen(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#008C15", "#FFC20E", "#ffffff"],
    });

    if (onAddCustomSub) {
      onAddCustomSub({
        id: "totem-" + Date.now(),
        name: `Totem Sub (${size}) • ${selectedProtein.name}`,
        bread: selectedBread.name,
        protein: selectedProtein.name,
        cheese: selectedCheese.name,
        veggies: Object.keys(selectedVeggies).filter((k) => selectedVeggies[k] !== "none"),
        sauce: selectedSauces.join(", "),
        calories: totalCalories,
        price: totalPrice,
      });
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("APPFRESH30");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="subway-lab" className="py-20 relative bg-[#040d07] overflow-hidden text-slate-100">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-emerald-600/10 rounded-full blur-[200px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Monte no <span className="text-[#FFC20E]">Totem Digital</span> Subway®
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Personalize cada item na tela de autoatendimento com fotografias exclusivas e envie o pedido para o seu celular.
          </p>
        </div>

        {/* THE KIOSK SCREEN CASING (TOTEM CONTAINER) */}
        <div className="relative mx-auto max-w-6xl rounded-[32px] sm:rounded-[40px] border-4 border-white/10 bg-[#08170d] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(0,140,21,0.2)] overflow-hidden">
          {/* Top Kiosk Bezel / Status Bar */}
          <div className="px-5 sm:px-8 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-extrabold text-xs tracking-wider text-white uppercase">
                  SUBWAY <span className="text-[#FFC20E]">KIOSK™</span>
                </span>
              </div>
            </div>

            {/* Order Mode (Comer Aqui vs Levar) */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/5 rounded-full border border-white/10 flex items-center">
                <button
                  onClick={() => setOrderType("comer-aqui")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    orderType === "comer-aqui"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Comer Aqui
                </button>
                <button
                  onClick={() => setOrderType("levar")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    orderType === "levar"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Para Viagem
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono pl-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Kiosk Main Body: Left Vertical Category Rail + Right Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left Rail: Totem Step Categories */}
            <div className="lg:col-span-4 bg-black/40 border-r border-white/10 p-4 sm:p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[11px] uppercase font-mono tracking-widest text-emerald-400 font-bold mb-3 px-2">
                  Etapas do Seu Pedido
                </div>

                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as any)}
                      className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all cursor-pointer group ${
                        isActive
                          ? "bg-emerald-950/90 border-emerald-400 text-white shadow-[0_0_20px_rgba(0,140,21,0.3)] ring-1 ring-emerald-400 scale-[1.01]"
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-2xl p-2 rounded-xl bg-black/40 border border-white/10">
                        {cat.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors">
                          {cat.label}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {cat.activeDesc}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? "text-[#FFC20E] translate-x-1" : "text-slate-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Order Live Summary Badge in Left Rail */}
              <div className="hidden lg:block mt-6 p-4 rounded-2xl bg-black/60 border border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Métricas da Criação:</span>
                  <span className="text-emerald-400 font-bold">{totalCalories} kcal</span>
                </div>
                <div className="mt-2 text-xs text-slate-300">
                  <span className="text-white font-bold">{size === "30cm" ? "30 cm Footlong (2x)" : "15 cm Individual"}</span> • {selectedProtein.name} no pão{" "}
                  {selectedBread.name}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Total Atual</span>
                  <span className="text-xl font-black text-[#FFC20E]">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Work Area: Touch Cards Grid */}
            <div className="lg:col-span-8 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[640px]">
              <div>
                {/* 1. BREAD & SIZE CATEGORY */}
                {activeCategory === "bread" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                          <span>1. Escolha o Tamanho e a Massa do Pão</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Pães assados artesanalmente de hora em hora em todas as unidades Subway.
                        </p>
                      </div>

                      {/* Size Selector */}
                      <div className="flex items-center p-1 bg-black/60 rounded-full border border-white/10 self-start sm:self-auto">
                        <button
                          onClick={() => setSize("15cm")}
                          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            size === "15cm"
                              ? "bg-[#008C15] text-white shadow-md ring-1 ring-emerald-400/50"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <span>15 cm Individual</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${size === "15cm" ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                            1x
                          </span>
                        </button>
                        <button
                          onClick={() => setSize("30cm")}
                          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            size === "30cm"
                              ? "bg-[#008C15] text-white shadow-md ring-1 ring-emerald-400/50"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <span>30 cm Footlong</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${size === "30cm" ? "bg-[#FFC20E] text-slate-950 font-black" : "bg-white/5 text-[#FFC20E]"}`}>
                            2x
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {KIOSK_BREADS.map((bread) => {
                        const isSelected = selectedBread.id === bread.id;
                        return (
                          <div
                            key={bread.id}
                            onClick={() => setSelectedBread(bread)}
                            className={`p-4 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between group active:scale-[0.98] ${
                              isSelected
                                ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_10px_30px_rgba(0,140,21,0.3)]"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {bread.badge && (
                              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFC20E] text-slate-950 font-black uppercase">
                                {bread.badge}
                              </span>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                                <Image
                                  src={bread.image}
                                  alt={bread.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-white">{bread.name}</h4>
                                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{bread.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-white/10">
                              <span className="text-slate-400 font-mono">
                                {bread.cal * calMultiplier} kcal
                              </span>
                              <span className="text-emerald-400 font-bold">
                                {bread.price > 0
                                  ? `+ R$ ${(bread.price * sizeMultiplier).toFixed(2).replace(".", ",")}`
                                  : "Incluso"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. PROTEIN CATEGORY */}
                {activeCategory === "protein" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-extrabold text-white">
                          2. Selecione o Recheio / Proteína Principal
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Carnes fatiadas e salteadas na hora para máxima suculência.
                        </p>
                      </div>

                      {/* Size Selector in Step 2 */}
                      <div className="flex items-center p-1 bg-black/60 rounded-full border border-white/10 self-start sm:self-auto">
                        <button
                          onClick={() => setSize("15cm")}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            size === "15cm"
                              ? "bg-[#008C15] text-white shadow-md ring-1 ring-emerald-400/50"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <span>15 cm</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${size === "15cm" ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                            1x
                          </span>
                        </button>
                        <button
                          onClick={() => setSize("30cm")}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            size === "30cm"
                              ? "bg-[#008C15] text-white shadow-md ring-1 ring-emerald-400/50"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <span>30 cm</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${size === "30cm" ? "bg-[#FFC20E] text-slate-950 font-black" : "bg-white/5 text-[#FFC20E]"}`}>
                            2x
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {KIOSK_PROTEINS.map((protein) => {
                        const isSelected = selectedProtein.id === protein.id;
                        return (
                          <div
                            key={protein.id}
                            onClick={() => setSelectedProtein(protein)}
                            className={`p-4 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between group active:scale-[0.98] ${
                              isSelected
                                ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_10px_30px_rgba(0,140,21,0.3)]"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {protein.badge && (
                              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black uppercase">
                                {protein.badge}
                              </span>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                                <Image
                                  src={protein.image}
                                  alt={protein.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-white">{protein.name}</h4>
                                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{protein.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-white/10">
                              <span className="text-slate-400 font-mono">
                                {protein.cal * calMultiplier} kcal • {protein.protein * calMultiplier}g prot
                              </span>
                              <span className="text-[#FFC20E] font-black text-sm">
                                R$ {(protein.price * sizeMultiplier).toFixed(2).replace(".", ",")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. CHEESE & TOASTING CATEGORY */}
                {activeCategory === "cheese" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">
                        3. Escolha o Queijo e o Ponto do Forno
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Queijo fundido na chapa para abraçar a carne e o pão.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {KIOSK_CHEESES.map((cheese) => {
                        const isSelected = selectedCheese.id === cheese.id;
                        return (
                          <div
                            key={cheese.id}
                            onClick={() => setSelectedCheese(cheese)}
                            className={`p-4 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between group active:scale-[0.98] ${
                              isSelected
                                ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_10px_30px_rgba(0,140,21,0.3)]"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {cheese.badge && (
                              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-black uppercase">
                                {cheese.badge}
                              </span>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center">
                                {cheese.image ? (
                                  <Image
                                    src={cheese.image}
                                    alt={cheese.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                ) : (
                                  <span className="text-2xl text-slate-500">🚫</span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-white">{cheese.name}</h4>
                                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{cheese.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-white/10">
                              <span className="text-slate-400 font-mono">
                                {cheese.cal * calMultiplier} kcal
                              </span>
                              <span className="text-emerald-400 font-bold">
                                {size === "30cm" ? "Incluso (2x)" : "Incluso"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Toasting Option */}
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                        Ponto do Pão & Forno Turbo:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setToasting("tostado")}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            toasting === "tostado"
                              ? "bg-[#008C15] border-emerald-400 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          🔥 Tostado Quentinho
                        </button>
                        <button
                          onClick={() => setToasting("extra")}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            toasting === "extra"
                              ? "bg-[#008C15] border-emerald-400 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          ⚡ Extra Tostado
                        </button>
                        <button
                          onClick={() => setToasting("frio")}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            toasting === "frio"
                              ? "bg-[#008C15] border-emerald-400 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          ❄️ Pão Macio / Frio
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. FRESH VEGGIES CATEGORY (WITH UNIQUE COMMERCIAL PHOTOS) */}
                {activeCategory === "veggies" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-white">
                          4. Vegetais & Saladas da Horta
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Clique no card para alternar: <span className="text-emerald-400 font-bold">Normal</span>,{" "}
                          <span className="text-[#FFC20E] font-bold">Extra</span> ou{" "}
                          <span className="text-slate-500 font-bold">Sem</span>.
                        </p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {activeVeggiesCount} de {KIOSK_VEGGIES.length} ativos
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {KIOSK_VEGGIES.map((v) => {
                        const state = selectedVeggies[v.id] || "none";
                        return (
                          <div
                            key={v.id}
                            onClick={() => cycleVeggie(v.id)}
                            className={`p-3.5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group active:scale-[0.98] ${
                              state === "normal"
                                ? "bg-emerald-950/70 border-emerald-400 shadow-md ring-1 ring-emerald-500/40"
                                : state === "extra"
                                ? "bg-yellow-950/70 border-yellow-400 shadow-md ring-1 ring-yellow-500/40"
                                : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                                <Image
                                  src={v.image}
                                  alt={v.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                                  <span>{v.icon}</span>
                                  <span>{v.name}</span>
                                </h4>
                                <span className="text-[10px] text-slate-400 block mt-0.5">{v.desc}</span>
                              </div>
                            </div>

                            {/* Badge state indicator */}
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
                                state === "normal"
                                  ? "bg-emerald-500 text-slate-950"
                                  : state === "extra"
                                  ? "bg-[#FFC20E] text-slate-950 shadow-[0_0_10px_rgba(255,194,14,0.4)]"
                                  : "bg-black/40 text-slate-500 border border-white/10"
                              }`}
                            >
                              {state === "normal" ? "✓ Normal" : state === "extra" ? "⭐ Extra" : "Sem"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. SAUCES CATEGORY */}
                {activeCategory === "sauce" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">
                        5. Escolha Seus Molhos Assinatura (Até 3)
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Cada molho possui receita autoral com ingredientes selecionados.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {KIOSK_SAUCES.map((sauce) => {
                        const isSelected = selectedSauces.includes(sauce.id);
                        return (
                          <div
                            key={sauce.id}
                            onClick={() => toggleSauce(sauce.id)}
                            className={`p-4 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between group active:scale-[0.98] ${
                              isSelected
                                ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_10px_30px_rgba(0,140,21,0.3)]"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {sauce.badge && (
                              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFC20E] text-slate-950 font-black uppercase">
                                {sauce.badge}
                              </span>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                                <Image
                                  src={sauce.image}
                                  alt={sauce.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-white">{sauce.name}</h4>
                                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{sauce.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-white/10">
                              <span className="text-slate-400 font-mono">
                                {sauce.cal * calMultiplier} kcal
                              </span>
                              <div
                                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                  isSelected ? "bg-emerald-500 text-slate-950" : "border border-white/20 text-transparent"
                                }`}
                              >
                                ✓
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 6. TURBINE SEU COMBO (BEBIDAS & COOKIES) */}
                {activeCategory === "combo" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                        <span>🥤 6. Deseja Turbinar com Combo & Acompanhamento?</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Adicione refrigerante refil geladinho e cookie quentinho recém-saído do forno com desconto especial!
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {COMBOS.map((c) => {
                        const isSelected = selectedCombo.id === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setSelectedCombo(c)}
                            className={`p-4 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between group active:scale-[0.98] ${
                              isSelected
                                ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_10px_30px_rgba(0,140,21,0.3)]"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {c.badge && (
                              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFC20E] text-slate-950 font-black uppercase">
                                {c.badge}
                              </span>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                                <Image
                                  src={c.image}
                                  alt={c.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-white">{c.name}</h4>
                                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{c.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-white/10">
                              <span className="text-slate-400 font-mono">
                                {c.cal > 0 ? `+ ${c.cal} kcal` : "Sem adicional"}
                              </span>
                              <span className="text-[#FFC20E] font-black text-sm">
                                {c.price > 0 ? `+ R$ ${c.price.toFixed(2)}` : "R$ 0,00"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Bar inside Work Area (Próximo / Voltar) */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                <button
                  onClick={() => {
                    const idx = categories.findIndex((c) => c.id === activeCategory);
                    if (idx > 0) setActiveCategory(categories[idx - 1].id as any);
                  }}
                  disabled={activeCategory === "bread"}
                  className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Etapa Anterior</span>
                </button>

                {activeCategory !== "combo" ? (
                  <button
                    onClick={() => {
                      const idx = categories.findIndex((c) => c.id === activeCategory);
                      if (idx < categories.length - 1) setActiveCategory(categories[idx + 1].id as any);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer active:scale-95"
                  >
                    <span>Próxima Etapa</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleOpenAppModal}
                    className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] text-xs font-black uppercase tracking-wider text-white shadow-[0_0_30px_rgba(0,140,21,0.5)] transition-all cursor-pointer active:scale-95 animate-pulse"
                  >
                    <span>Finalizar Pedido</span>
                    <ArrowRight className="w-4 h-4 text-[#FFC20E]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* KIOSK BOTTOM ORDER DOCK (BARRA INFERIOR DE BANDEJA DO TOTEM) */}
          <div className="p-4 sm:p-6 bg-black/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
            {/* Selected items miniature tray */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                  Bandeja Totem:
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-emerald-300 font-bold">
                  {size === "30cm" ? "30 cm Footlong (2x)" : "15 cm Individual"} • {selectedBread.name}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-emerald-300 font-bold">
                  {selectedProtein.name}
                </span>
                {selectedCheese.id !== "no-cheese" && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-yellow-300 font-bold">
                    {selectedCheese.name}
                  </span>
                )}
                {selectedCombo.id !== "no-combo" && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-[#FFC20E] font-bold">
                    {selectedCombo.name}
                  </span>
                )}
              </div>
            </div>

            {/* Total Price and Primary Action */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">
                    Total da Comanda
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {totalCalories} kcal
                  </span>
                </div>
                <span className="text-2xl font-black text-[#FFC20E]">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <button
                onClick={handleOpenAppModal}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] text-xs font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(0,140,21,0.4)] transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-yellow-300" />
                <span>Terminar Pedido no App</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL / SCREEN TAKEOVER: "TERMINE O SEU PEDIDO NO APP SUBWAY®" */}
      {/* ========================================================================= */}
      {isAppModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-[#091a10] border-2 border-emerald-500/40 rounded-[32px] sm:rounded-[40px] shadow-[0_0_80px_rgba(0,140,21,0.4)] p-6 sm:p-8 overflow-hidden text-white">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFC20E]/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsAppModalOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-[#FFC20E] border border-yellow-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Integração Totem → App Subway</span>
            </div>

            {/* Modal Title */}
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Termine o seu pedido no <span className="text-[#FFC20E]">App Subway®</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5">
              Sua receita montada no Totem #{orderNumber} foi transferida! Escaneie o QR Code abaixo com a câmera do celular para pagar com 30% OFF e acumular pontos SubClub.
            </p>

            {/* Main Content Grid: QR Code Left + Order Card Right */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center my-6">
              {/* QR Code Container */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 rounded-3xl bg-white text-slate-950 shadow-2xl relative">
                <div className="w-44 h-44 relative flex items-center justify-center">
                  {/* High-Resolution SVG QR Code with Subway Branding Center */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Finder Patterns */}
                    <rect x="5" y="5" width="26" height="26" rx="4" fill="#008C15" />
                    <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                    <rect x="13" y="13" width="10" height="10" rx="1" fill="#FFC20E" />

                    <rect x="69" y="5" width="26" height="26" rx="4" fill="#008C15" />
                    <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                    <rect x="77" y="13" width="10" height="10" rx="1" fill="#FFC20E" />

                    <rect x="5" y="69" width="26" height="26" rx="4" fill="#008C15" />
                    <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                    <rect x="13" y="77" width="10" height="10" rx="1" fill="#FFC20E" />

                    {/* QR Code Data Pattern simulation */}
                    <g fill="#0b1710">
                      <rect x="36" y="8" width="5" height="5" rx="1" />
                      <rect x="45" y="8" width="5" height="5" rx="1" />
                      <rect x="55" y="8" width="5" height="5" rx="1" />
                      <rect x="36" y="18" width="5" height="5" rx="1" />
                      <rect x="50" y="18" width="5" height="5" rx="1" />
                      <rect x="8" y="36" width="5" height="5" rx="1" />
                      <rect x="18" y="36" width="5" height="5" rx="1" />
                      <rect x="27" y="36" width="5" height="5" rx="1" />
                      <rect x="36" y="36" width="5" height="5" rx="1" />
                      <rect x="45" y="36" width="5" height="5" rx="1" />
                      <rect x="55" y="36" width="5" height="5" rx="1" />
                      <rect x="64" y="36" width="5" height="5" rx="1" />
                      <rect x="73" y="36" width="5" height="5" rx="1" />
                      <rect x="82" y="36" width="5" height="5" rx="1" />
                      <rect x="36" y="45" width="5" height="5" rx="1" />
                      <rect x="64" y="45" width="5" height="5" rx="1" />
                      <rect x="82" y="45" width="5" height="5" rx="1" />
                      <rect x="8" y="55" width="5" height="5" rx="1" />
                      <rect x="27" y="55" width="5" height="5" rx="1" />
                      <rect x="36" y="55" width="5" height="5" rx="1" />
                      <rect x="64" y="55" width="5" height="5" rx="1" />
                      <rect x="73" y="55" width="5" height="5" rx="1" />
                      <rect x="36" y="64" width="5" height="5" rx="1" />
                      <rect x="45" y="64" width="5" height="5" rx="1" />
                      <rect x="82" y="64" width="5" height="5" rx="1" />
                      <rect x="36" y="73" width="5" height="5" rx="1" />
                      <rect x="55" y="73" width="5" height="5" rx="1" />
                      <rect x="64" y="73" width="5" height="5" rx="1" />
                      <rect x="73" y="73" width="5" height="5" rx="1" />
                      <rect x="82" y="73" width="5" height="5" rx="1" />
                      <rect x="45" y="82" width="5" height="5" rx="1" />
                      <rect x="55" y="82" width="5" height="5" rx="1" />
                      <rect x="64" y="82" width="5" height="5" rx="1" />
                    </g>
                  </svg>

                  {/* Subway Mini Logo Badge in center of QR Code */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="px-2 py-0.5 rounded-md bg-[#008C15] border border-white text-white font-black text-[9px] tracking-tight shadow-md">
                      SUB<span className="text-[#FFC20E]">WAY</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-1">
                  Escaneie com a Câmera
                </span>
              </div>

              {/* Order Details & Coupon Box */}
              <div className="sm:col-span-7 flex flex-col justify-between gap-3">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Comanda do Totem:</span>
                    <span className="text-emerald-400 font-bold">#{orderNumber}</span>
                  </div>
                  <h4 className="font-extrabold text-base text-white">
                    Subway® {size} • {selectedProtein.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedBread.name} • {selectedCheese.name} ({toasting}) • {activeVeggiesCount} Vegetais • Molho{" "}
                    {selectedSauces.map((s) => KIOSK_SAUCES.find((item) => item.id === s)?.name).join(", ")}
                  </p>
                  {selectedCombo.id !== "no-combo" && (
                    <div className="mt-2 text-xs text-[#FFC20E] font-bold">
                      + {selectedCombo.name}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Total no Totem:</span>
                    <span className="text-lg font-black text-white">
                      R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>

                {/* Exclusive App Discount Banner */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-amber-950/60 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#FFC20E] block">
                      Cupom 30% OFF no App:
                    </span>
                    <span className="font-mono font-black text-sm tracking-wider text-white">
                      APPFRESH30
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCoupon}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <a
                  href="#app-download"
                  onClick={() => setIsAppModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Baixar App (iOS / Android)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setIsAppModalOpen(false);
                    const target = document.getElementById("app-download");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Smartphone className="w-4 h-4 text-yellow-300" />
                  <span>Abrir no App Subway</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
