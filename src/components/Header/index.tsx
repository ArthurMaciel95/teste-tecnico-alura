"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";

  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 100); // Ativa após 100px de scroll
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`transition-all duration-0 ease-in-out z-50 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white/80  backdrop-blur-md shadow-lg py-4"
          : "relative bg-transparent py-0 mt-10"
      }`}
    >
      <div className="main_container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/svg/logo.svg" alt="Logo" width={50} height={50} />
            <h2 className="font-bold text-2xl chakra-petch text-brand-blue-600 hidden lg:block">
              FERNANDA MASCHETI
            </h2>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-6 font-bold">
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/">
                  <strong
                    className={`text-2xl font-bold chakra-petch transition-colors ${
                      isHomePage ? "text-brand-blue-500" : "text-brand-blue-600"
                    }`}
                  >
                    Início
                  </strong>
                </Link>
              </li>
              <li>
                <Link href="#blog">
                  <strong
                    className={`text-2xl font-bold chakra-petch transition-colors ${
                      isBlogPage ? "text-brand-blue-500" : "text-brand-blue-600"
                    }`}
                  >
                    Blog
                  </strong>
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
