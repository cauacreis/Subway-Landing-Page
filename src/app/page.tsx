"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import MarqueeTicker from "@/components/marquee-ticker";
import ProductShowcase, { ProductItem } from "@/components/product-showcase";
import SubBuilder from "@/components/sub-builder";
import StoryParallax from "@/components/story-parallax";
import AppDelivery from "@/components/app-delivery";
import CookiesRewards from "@/components/cookies-rewards";
import StoreLocator from "@/components/store-locator";
import Footer from "@/components/footer";
import CartDrawer, { CartItem } from "@/components/cart-drawer";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "bmt-supreme",
      name: "Italian B.M.T.® Masterpiece",
      price: 37.9,
      quantity: 1,
      details: "Parmesão & Orégano • Provolone • Alface & Tomate",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddProduct = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          details: product.tagline,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddCustomSub = (customSub: any) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: customSub.id,
        name: customSub.name,
        price: customSub.price,
        quantity: 1,
        details: `${customSub.bread} • ${customSub.protein} • ${customSub.cheese}`,
      },
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen flex flex-col bg-[#060e09] text-slate-100 selection:bg-[#008C15] selection:text-white">
      {/* Floating Island Navigation */}
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Infinite Fresh Marquee */}
      <MarqueeTicker />

      {/* Signature Series Collection */}
      <ProductShowcase onAddToCart={handleAddProduct} />

      {/* Subway Lab — Interactive Customizer (Differentiation Anchor) */}
      <SubBuilder onAddCustomSub={handleAddCustomSub} />

      {/* Farm-to-Subway: Parallax & Frescor Real Storytelling */}
      <StoryParallax />

      {/* Mobile Delivery & SubClub Rewards Experience */}
      <AppDelivery />

      {/* Sweet Corner Cookies & Verified Customer Social Proof */}
      <CookiesRewards />

      {/* Interactive Store Locator & Maps Routing */}
      <StoreLocator />

      {/* Luxury Brand Footer */}
      <Footer />

      {/* Shopping Bag Drawer Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </main>
  );
}
