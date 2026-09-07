"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check, Flame, Heart, Sparkles, Star } from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  seriesNumber: string;
  tagline: string;
  description: string;
  category: "all" | "chef" | "smoked" | "fit";
  image: string;
  price: number;
  calories: number;
  protein: number;
  highlightTag: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "bmt-supreme",
    name: "Italian B.M.T.® Masterpiece",
    seriesNumber: "#01",
    tagline: "O lendário clássico refinado com cortes nobres",
    description:
      "Salame de cura italiana, pepperoni defumado e presunto tenro sobre pão artesanal com orégano e queijo provolone derretido.",
    category: "chef",
    image: "/images/bmt.jpg",
    price: 37.9,
    calories: 590,
    protein: 32,
    highlightTag: "Mais Pedido",
  },
  {
    id: "teriyaki-glazed",
    name: "Sweet Onion Chicken Teriyaki",
    seriesNumber: "#02",
    tagline: "Frango macio com glaze agridoce oriental",
    description:
      "Tiras suculentas de peito de frango marinadas ao molho teriyaki, queijo suíço, cebola roxa crocante e sementes de gergelim douradas.",
    category: "chef",
    image: "/images/teriyaki.jpg",
    price: 36.9,
    calories: 510,
    protein: 36,
    highlightTag: "Sabor Intenso",
  },
  {
    id: "steak-cheddar",
    name: "Shaved Steak & Melted Cheddar",
    seriesNumber: "#03",
    tagline: "Corte angus com cascata de queijo cheddar",
    description:
      "Fatias nobres de carne bovina temperada na chapa, queijo cheddar inglês fundido e pimentões salteados em baguete artesanal tostada.",
    category: "smoked",
    image: "/images/steak.jpg",
    price: 42.9,
    calories: 640,
    protein: 41,
    highlightTag: "Cheddar Melt",
  },
  {
    id: "veggie-supreme",
    name: "Veggie Supreme & Avocado Glaze",
    seriesNumber: "#04",
    tagline: "Frescor botânico, abacate e queijo feta",
    description:
      "Abacate hass em lâminas cremosas, espinafre precoce, queijo feta esfarelado e redução de balsâmico em pão 9 grãos com sementes.",
    category: "fit",
    image: "/images/veggie.jpg",
    price: 34.9,
    calories: 420,
    protein: 18,
    highlightTag: "100% Fresco",
  },
];

interface ProductShowcaseProps {
  onAddToCart?: (item: ProductItem) => void;
}

export default function ProductShowcase({ onAddToCart }: ProductShowcaseProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "chef" | "smoked" | "fit">("all");
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filteredProducts =
    selectedFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedFilter);

  const handleAdd = (product: ProductItem) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1800);
  };

  const filterTabs = [
    { id: "all", label: "Todas as Criações" },
    { id: "chef", label: "Favoritos do Chef" },
    { id: "smoked", label: "Defumados & Quentes" },
    { id: "fit", label: "Leves & Fit" },
  ];

  return (
    <section id="signature" className="py-28 relative overflow-hidden bg-[#060e09]">
      {/* Subtle Glow backdrop */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-500/20 text-[#FFC20E] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Receitas Assinadas</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A Coleção <span className="text-[#008C15]">Signature</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-base">
              Combinações de autor criadas pelos nossos mestres de sabor com proporções exatas de carnes nobres, queijos e molhos.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-[#008C15] text-white shadow-[0_0_20px_rgba(0,140,21,0.4)]"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (Double-Bezel Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="double-bezel group hover:-translate-y-2 hover:border-emerald-500/30 flex flex-col justify-between"
              >
                <div className="double-bezel-inner p-4 flex flex-col h-full">
                  {/* Image Container with high depth */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-black/40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badge top-left - Only show for 'Mais Pedido' */}
                    {product.highlightTag === "Mais Pedido" && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-[#FFC20E] shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FFC20E]" />
                        <span>Mais Pedido</span>
                      </span>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#FFC20E]/90 font-medium mt-1">
                      {product.tagline}
                    </p>
                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom Action bar */}
                  <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">
                        Preço à vista
                      </span>
                      <span className="text-lg font-extrabold text-white">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    {/* Add Button with Button-in-Button kinetic feedback */}
                    <button
                      onClick={() => handleAdd(product)}
                      className={`relative px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        isAdded
                          ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                          : "bg-white/10 hover:bg-[#008C15] text-white hover:shadow-[0_0_20px_rgba(0,140,21,0.5)] border border-white/10"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <span>Pedir</span>
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </div>
                        </>
                      )}
                    </button>
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
