import React from "react";
import Link from "next/link";
export function Header() {
  return (
    <header className="main_container mx-auto flex items-center justify-between  mt-10">
      <div className="flex items-center gap-4">
        <img src="svg/logo.svg" alt="Logo" />
        <h2 className="font-bold text-2xl chakra-petch text-brand-blue-600">
          FERNANDA MASCHETI
        </h2>
      </div>
      <div className="block">
        <nav className="flex items-center gap-6 font-bold">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/">
                <strong className="text-2xl font-bold chakra-petch text-brand-blue-500">
                  Início
                </strong>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <strong className="text-2xl font-bold chakra-petch text-brand-blue-600">
                  Blog
                </strong>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
