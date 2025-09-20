import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full h-16  text-brand-blue-300 flex justify-center items-center text-sm">
      © Copyright {new Date().getFullYear()}. Produzido por Fernanda Mascheti
    </footer>
  );
};
