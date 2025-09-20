import React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="text-sm cursor-pointer text-white font-bold   rounded-md px-4 py-2 bg-brand-blue-500 hover:bg-brand-blue-600 transition">
      {children}
    </button>
  );
};
