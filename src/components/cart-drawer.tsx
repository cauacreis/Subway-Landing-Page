"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Check } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(389);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 40 ? subtotal * 0.15 : 0;
  const delivery = subtotal > 50 || items.length === 0 ? 0 : 7.9;
  const total = Math.max(0, subtotal - discount + delivery);

  const handleConfirmOrder = () => {
    setOrderNumber(Math.floor(100 + Math.random() * 900));
    setIsConfirmed(true);
    if (typeof window !== "undefined") {
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#008C15", "#FFC20E", "#ffffff"],
        });
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#09150d] border-l border-emerald-500/20 shadow-2xl flex flex-col justify-between h-full p-6 sm:p-8 z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Sua Sacola Fresh</h3>
              <span className="text-xs text-slate-400">
                {items.reduce((s, i) => s + i.quantity, 0)} itens selecionados
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isConfirmed ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6 px-2 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)] mb-5">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-[#FFC20E] border border-yellow-500/30 text-xs font-bold uppercase tracking-wider mb-2 font-mono">
              Pedido #SUB-{orderNumber}
            </span>

            <h3 className="text-2xl font-black text-white tracking-tight mb-2">
              Pedido Confirmado!
            </h3>

            <p className="text-xs text-slate-300 max-w-xs leading-relaxed mb-6">
              Sua receita exclusiva foi enviada diretamente para a chapa. Pão artesanal e ingredientes frescos a caminho!
            </p>

            <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2.5 mb-6 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Tempo Estimado:</span>
                <span className="text-emerald-400 font-bold">25 - 35 minutos</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Quantidade:</span>
                <span className="text-white">{items.reduce((s, i) => s + i.quantity, 0)} itens</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-white/10 pt-2 font-sans font-bold">
                <span className="text-slate-300">Total Pago:</span>
                <span className="text-[#FFC20E] text-base">R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,140,21,0.5)] transition-all cursor-pointer active:scale-95"
            >
              Concluir & Acompanhar Entrega
            </button>
          </div>
        ) : (
          <>
            {/* Item List */}
            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="relative w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FFC20E]/10 to-transparent pointer-events-none" />
                    <Image
                      src="/images/icons/sandwich_3d.png"
                      alt="Sanduíche Subway 3D"
                      width={64}
                      height={64}
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                      priority
                    />
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">Sua sacola está vazia</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explore a coleção Signature ou monte sua receita exclusiva no Subway Lab para saborear.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                      {item.details && (
                        <p className="text-[11px] text-emerald-400/90 font-mono mt-0.5 truncate max-w-[200px]">
                          {item.details}
                        </p>
                      )}
                      <span className="text-xs font-bold text-[#FFC20E] mt-1 block">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout Calculation */}
            {items.length > 0 && (
              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FFC20E]" />
                      <span>Desconto Subway Lab (15%)</span>
                    </span>
                    <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-slate-400">
                  <span>Taxa de Entrega Express</span>
                  <span>
                    {delivery === 0 ? (
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">
                        Frete Grátis
                      </span>
                    ) : (
                      `R$ ${delivery.toFixed(2).replace(".", ",")}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/5">
                  <span>Total Estimado</span>
                  <span className="text-xl text-[#FFC20E]">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,140,21,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-95"
                >
                  <span>Confirmar Pedido</span>
                  <ArrowRight className="w-4 h-4 text-yellow-300" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
