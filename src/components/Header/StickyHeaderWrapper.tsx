"use client";

import React, { useState, useEffect } from "react";

interface StickyHeaderWrapperProps {
  children: React.ReactNode;
}

export function StickyHeaderWrapper({ children }: StickyHeaderWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Espaçador compensatório quando header fica fixo */}
      {isScrolled && <div className="h-20" />}
      {children}
    </>
  );
}
