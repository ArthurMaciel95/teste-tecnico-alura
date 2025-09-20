import Link from "next/link";
import React from "react";

interface CardProps {
  img?: string;
  title?: string;
  alt?: string;
  description?: string;
  category?: string;
  href?: string;
  slug?: string;
}

export const Card = ({
  img,
  title,
  alt,
  description,
  category,
  href,
  slug,
}: CardProps) => {
  return (
    <Link href={slug || "#"}>
      <div className="border border-brand-blue-500 bg-white rounded-lg p-6 hover:shadow-[0_4px_20px_rgba(59,130,246,0.5)] transition-shadow duration-300 cursor-pointer">
        <div className="relative overflow-hidden ">
          <img src={img} alt={alt} className="w-full max-h-50 object-cover " />
          <span className="absolute bottom-0 right-0 bg-brand-blue-500 text-white font-normal chakra-petch h-[30px] flex justify-center items-center w-[130px]">
            {category}
          </span>
        </div>
        <h2 className="font-bold text-xl mt-4 mb-2 chakra-petch">{title}</h2>
        <p className="text-brand-blue-300">{description}</p>
        <div className="mt-5">
          <Link
            href={href || "#"}
            className="text-brand-blue-500 hover:underline font-bold"
          >
            Ler mais
          </Link>
        </div>
      </div>
    </Link>
  );
};
