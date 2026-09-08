"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navigation, Clock, Phone, Search, ChevronRight, Check } from "lucide-react";
import type { MapStore } from "./interactive-map";

const InteractiveMap = dynamic(() => import("./interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] rounded-2xl bg-[#09150d] flex flex-col items-center justify-center text-slate-400 gap-3 border border-white/10">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-emerald-400">Carregando mapa interativo Subway®...</span>
    </div>
  ),
});

const SAMPLE_STORES: MapStore[] = [
  {
    id: "store-1",
    name: "Subway® Paulista Prime",
    address: "Av. Paulista, 1842 - Bela Vista",
    district: "Bela Vista",
    city: "São Paulo, SP",
    distance: "650 m",
    hours: "Aberto agora até às 23:30",
    hasDriveThru: false,
    phone: "(11) 3284-9000",
    lat: -23.5587,
    lng: -46.6596,
  },
  {
    id: "store-2",
    name: "Subway® Faria Lima Express",
    address: "Av. Brg. Faria Lima, 2232 - Jardim Paulistano",
    district: "Jardim Paulistano",
    city: "São Paulo, SP",
    distance: "1.2 km",
    hours: "Aberto 24 horas • Drive-thru ativo",
    hasDriveThru: true,
    phone: "(11) 3031-4500",
    lat: -23.5794,
    lng: -46.6908,
  },
  {
    id: "store-3",
    name: "Subway® Vila Madalena Artesanal",
    address: "Rua Fradique Coutinho, 980 - Pinheiros",
    district: "Pinheiros",
    city: "São Paulo, SP",
    distance: "2.1 km",
    hours: "Aberto agora até às 00:00",
    hasDriveThru: false,
    phone: "(11) 3812-7800",
    lat: -23.5601,
    lng: -46.6897,
  },
  {
    id: "store-4",
    name: "Subway® Shopping Eldorado",
    address: "Av. Rebouças, 3970 - Pinheiros",
    district: "Pinheiros",
    city: "São Paulo, SP",
    distance: "3.4 km",
    hours: "Aberto agora até às 22:00",
    hasDriveThru: false,
    phone: "(11) 3819-2000",
    lat: -23.5731,
    lng: -46.6975,
  },
];

export default function StoreLocator() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState<MapStore>(SAMPLE_STORES[0]);

  const filteredStores = SAMPLE_STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="locator" className="py-28 relative bg-[#07130b] overflow-hidden">
      {/* Background radial radiance */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Sempre um <span className="text-[#008C15]">Subway</span> Perto de Você
            </h2>
            <p className="text-slate-400 mt-2 text-base max-w-xl">
              Mais de 1.800 unidades no Brasil com ingredientes frescos fatiados todos os dias. Encontre a loja mais conveniente.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite seu bairro, CEP ou rua..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
            />
          </div>
        </div>

        {/* Store Grid + Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Store List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {filteredStores.map((store) => {
              const isSelected = selectedStore.id === store.id;
              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-emerald-950/70 border-emerald-400 shadow-[0_0_25px_rgba(0,140,21,0.3)] ring-1 ring-emerald-400"
                      : "bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-white font-bold text-base leading-snug">{store.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{store.address}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-yellow-400/10 text-[#FFC20E] border border-yellow-500/20 text-xs font-mono font-bold shrink-0">
                      {store.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono mt-4 pt-3 border-t border-white/5 text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{store.hours}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Real Map Component */}
          <div className="lg:col-span-7 double-bezel relative">
            <div className="double-bezel-inner p-2 sm:p-3 h-full flex flex-col justify-between min-h-[460px] bg-[#09150d] relative overflow-hidden rounded-[28px]">
              {/* Real Map Canvas */}
              <div className="relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden">
                <InteractiveMap
                  stores={filteredStores}
                  selectedStore={selectedStore}
                  onSelectStore={setSelectedStore}
                />

                {/* Selected Store Floating Info Panel overlaid on the map */}
                <div className="absolute bottom-3 left-3 right-3 p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-[400] shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-[#FFC20E] shrink-0">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm block">
                        {selectedStore.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {selectedStore.phone} • A {selectedStore.distance} de você
                      </span>
                    </div>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      selectedStore.name + " " + selectedStore.address + " " + selectedStore.city
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
                  >
                    <span>Traçar Rota no Waze / Maps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
