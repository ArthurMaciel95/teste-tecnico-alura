"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();

  // Verifica se estamos na página inicial
  const isHomePage = pathname === "/";
  // Verifica se estamos em qualquer página do blog
  const isBlogPage = pathname.startsWith("/blog");

  return (
    <header className="main_container mx-auto flex items-center justify-between mt-10">
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
              <strong
                className={`text-2xl font-bold chakra-petch transition-colors ${
                  isBlogPage ? "text-brand-blue-500" : "text-brand-blue-600"
                }`}
              >
                Blog
              </strong>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
