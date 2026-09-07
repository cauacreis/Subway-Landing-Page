"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Menu, X, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({ cartCount = 0, onOpenCart }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("subway-lab");

  const navLinks = [
    { id: "signature", name: "Signature Series", href: "#signature" },
    { id: "subway-lab", name: "Subway Lab 🧪", href: "#subway-lab" },
    { id: "fresh", name: "Frescor Artesanal", href: "#fresh" },
    { id: "app", name: "App & Recompensas", href: "#app" },
    { id: "locator", name: "Lojas", href: "#locator" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ["signature", "subway-lab", "fresh", "app", "locator"];

      // If scrolled near bottom of page, activate last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection("locator");
        return;
      }

      // If near top of page (Hero section), keep active section clean or match Hero
      if (window.scrollY < 250) {
        const heroEl = document.getElementById("hero");
        if (heroEl) {
          setActiveSection("");
        } else {
          // If no hero id, check first section
          const firstEl = document.getElementById(sectionIds[0]);
          if (firstEl && firstEl.getBoundingClientRect().top > 300) {
            setActiveSection("");
            return;
          }
        }
      }

      // Detect which section is currently centered/active in viewport
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom > 250) {
            current = id;
            break;
          }
        }
      }

      // Fallback to latest section scrolled past
      if (!current && window.scrollY >= 250) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 250) {
              current = sectionIds[i];
              break;
            }
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();

    // Check initial hash
    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (["signature", "subway-lab", "fresh", "app", "locator"].includes(hashId)) {
        setActiveSection(hashId);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 flex justify-center px-4 ${
          isScrolled ? "pt-3" : "pt-6"
        }`}
      >
        <nav
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-500 backdrop-blur-2xl ${
            isScrolled
              ? "bg-[#07130b]/85 border-emerald-500/20 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8)] ring-1 ring-emerald-500/10"
              : "bg-[#07130b]/60 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center tracking-tighter">
              <span className="font-extrabold text-2xl md:text-3xl text-[#008C15] group-hover:brightness-110 transition-all">
                SUB
              </span>
              <span className="font-extrabold text-2xl md:text-3xl text-[#FFC20E] group-hover:brightness-110 transition-all">
                WAY
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with Shared Layout Sliding Pill */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-[#FFC20E] font-semibold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-yellow-400/10 border border-yellow-500/35 shadow-[0_0_20px_rgba(255,194,14,0.2)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Island */}
          <div className="flex items-center gap-3">
            {/* Find store quick pill */}
            <Link
              href="#locator"
              onClick={() => setActiveSection("locator")}
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-2 rounded-full transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FFC20E]" />
              <span>Encontrar Loja</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer group"
              aria-label="Ver sacola"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110 text-emerald-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#FFC20E] to-amber-500 text-slate-950 font-extrabold text-[11px] flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Island CTA */}
            <Link
              href="#subway-lab"
              onClick={() => setActiveSection("subway-lab")}
              className="hidden md:flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] hover:to-[#008C15] text-white text-xs font-bold tracking-wide uppercase shadow-[0_0_25px_rgba(0,140,21,0.35)] hover:shadow-[0_0_35px_rgba(0,140,21,0.55)] transition-all group active:scale-[0.98]"
            >
              <span>Monte o Seu</span>
              <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:scale-105">
                <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/90 backdrop-blur-3xl flex flex-col justify-between p-8 pt-28 animate-in fade-in duration-300">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-mono">
              Menu de Navegação
            </span>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-2xl font-bold py-2 border-b border-white/5 transition-colors flex items-center justify-between ${
                    isActive ? "text-[#FFC20E]" : "text-slate-100 hover:text-[#FFC20E]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {isActive && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-[#FFC20E] border border-yellow-500/30 font-medium">
                        Ativo
                      </span>
                    )}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isActive ? "text-[#FFC20E]" : "text-slate-500"}`} />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <Link
              href="#subway-lab"
              onClick={() => {
                setActiveSection("subway-lab");
                setMobileMenuOpen(false);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#008C15] to-[#046a15] text-white font-bold text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,140,21,0.4)]"
            >
              <Sparkles className="w-4 h-4 text-[#FFC20E]" />
              <span>Personalizar no Subway Lab</span>
            </Link>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#FFC20E]" />
              <span>Mais de 1.800 restaurantes no Brasil</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
