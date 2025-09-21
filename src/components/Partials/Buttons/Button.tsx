import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  isActive?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  isActive = false,
  isSelected = false,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const baseClasses =
    "text-sm cursor-pointer font-bold rounded-md px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-brand-blue-300 focus:ring-offset-2";
  const activeClasses =
    isActive || isSelected
      ? "text-white bg-brand-blue-500"
      : "text-white bg-brand-blue-500 hover:bg-brand-blue-200";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${activeClasses} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
