"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Menu, X, MapPin, Sparkles } from "lucide-react";

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({ cartCount = 0, onOpenCart }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("signature");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const [pillStyle, setPillStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialRender = useRef(true);

  const navLinks = [
    { id: "signature", name: "Signature Series", href: "#signature" },
    { id: "subway-lab", name: "Subway Lab 🧪", href: "#subway-lab" },
    { id: "fresh", name: "Frescor Artesanal", href: "#fresh" },
    { id: "app", name: "App & Recompensas", href: "#app" },
    { id: "locator", name: "Lojas", href: "#locator" },
  ];

  // The active visual target is either the hovered link or the scroll-active section
  const currentTarget = hoveredSection || activeSection;

  // Measure and position the physical sliding pill
  const updatePill = useCallback(() => {
    const targetId = currentTarget;
    if (!targetId) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const currentLink = linkRefs.current[targetId];
    const container = navContainerRef.current;

    if (currentLink && container) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = currentLink.getBoundingClientRect();

      setPillStyle({
        left: Math.round(linkRect.left - containerRect.left),
        top: Math.round(linkRect.top - containerRect.top),
        width: Math.round(linkRect.width),
        height: Math.round(linkRect.height),
        opacity: 1,
      });
    }
  }, [currentTarget]);

  useEffect(() => {
    updatePill();

    const initTimer = setTimeout(() => {
      isInitialRender.current = false;
      updatePill();
    }, 100);

    const handleResize = () => updatePill();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [updatePill]);

  // Observe container size changes (e.g. font loading, zoom)
  useEffect(() => {
    if (!navContainerRef.current) return;
    const ro = new ResizeObserver(() => updatePill());
    ro.observe(navContainerRef.current);
    return () => ro.disconnect();
  }, [updatePill]);

  // Scrollspy to detect active section continuously
  useEffect(() => {
    const sectionIds = ["signature", "subway-lab", "fresh", "app", "locator"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If user recently clicked a link, let the animation finish before scroll overrides it
      if (isClickScrolling.current) return;

      const sectionsWithPositions = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop, height: el.offsetHeight } : null;
        })
        .filter(Boolean) as { id: string; top: number; height: number }[];

      if (sectionsWithPositions.length === 0) return;

      // At the top of the page, default to the first link ("signature")
      const firstSectionTop = sectionsWithPositions[0].top;
      if (window.scrollY < firstSectionTop - 250) {
        setActiveSection(sectionIds[0]);
        return;
      }

      // If near page bottom, activate the last section ("locator")
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Trigger threshold: 320px below top of viewport
      const scrollPos = window.scrollY + 320;

      let currentId = sectionsWithPositions[0].id;
      for (let i = sectionsWithPositions.length - 1; i >= 0; i--) {
        if (scrollPos >= sectionsWithPositions[i].top) {
          currentId = sectionsWithPositions[i].id;
          break;
        }
      }

      setActiveSection(currentId);
    };

    handleScroll();

    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (sectionIds.includes(hashId)) {
        setActiveSection(hashId);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, id: string, href: string) => {
    isClickScrolling.current = true;
    setActiveSection(id);
    setHoveredSection(null);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 950);

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center h-8 sm:h-9">
              <Image
                src="/images/icons/subway_logo.png"
                alt="Subway®"
                width={124}
                height={32}
                className="h-7 sm:h-8 w-auto object-contain group-hover:brightness-110 transition-all filter drop-shadow-[0_2px_8px_rgba(0,140,21,0.3)]"
                priority
              />
            </div>
          </Link>

          {/* Desktop & Tablet Nav Links with Physical Sliding Pill */}
          <div
            ref={navContainerRef}
            onMouseLeave={() => setHoveredSection(null)}
            className="relative hidden md:flex items-center gap-1 xl:gap-2"
          >
            {/* The single physical moving pill element that glides and stretches across the bar */}
            <div
              className="absolute top-0 left-0 pointer-events-none rounded-full bg-yellow-400/15 border-2 border-yellow-400/60 shadow-[0_0_25px_rgba(255,194,14,0.35)] z-0"
              style={{
                transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
                width: `${pillStyle.width}px`,
                height: `${pillStyle.height}px`,
                opacity: pillStyle.opacity,
                transition: isInitialRender.current
                  ? "opacity 0.2s ease"
                  : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
              }}
            />

            {navLinks.map((link) => {
              const isTarget = currentTarget === link.id;
              return (
                <Link
                  key={link.id}
                  ref={(el) => {
                    linkRefs.current[link.id] = el;
                  }}
                  href={link.href}
                  onMouseEnter={() => setHoveredSection(link.id)}
                  onClick={(e) => handleLinkClick(e, link.id, link.href)}
                  className={`relative z-10 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-250 select-none cursor-pointer ${
                    isTarget
                      ? "text-[#FFC20E] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Island */}
          <div className="flex items-center gap-3">
            {/* Find store quick pill */}
            <Link
              href="#locator"
              onClick={(e) => handleLinkClick(e, "locator", "#locator")}
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-2 rounded-full transition-all cursor-pointer"
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
              onClick={(e) => handleLinkClick(e, "subway-lab", "#subway-lab")}
              className="hidden lg:flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-[#008C15] to-[#046a15] hover:from-[#05a827] hover:to-[#008C15] text-white text-xs font-bold tracking-wide uppercase shadow-[0_0_25px_rgba(0,140,21,0.35)] hover:shadow-[0_0_35px_rgba(0,140,21,0.55)] transition-all group active:scale-[0.98] cursor-pointer"
            >
              <span>Monte o Seu</span>
              <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:scale-105">
                <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-black/90 backdrop-blur-3xl flex flex-col justify-between p-8 pt-28 animate-in fade-in duration-300">
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
                  onClick={(e) => {
                    handleLinkClick(e, link.id, link.href);
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
              onClick={(e) => {
                handleLinkClick(e, "subway-lab", "#subway-lab");
                setMobileMenuOpen(false);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#008C15] to-[#046a15] text-white font-bold text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,140,21,0.4)] cursor-pointer"
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
