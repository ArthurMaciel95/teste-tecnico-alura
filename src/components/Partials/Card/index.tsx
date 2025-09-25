import Link from "next/link";
import React from "react";
import { CardProps } from "@/types";

export const Card = ({
  img,
  title,
  description,
  category,
  href,
  animationDelay = 0,
}: CardProps) => {
  return (
    <Link href={href || "#"} aria-label={`Ler mais sobre: ${title}`}>
      <article className="group border border-brand-blue-500 min-h-[470px] bg-brand-background rounded-lg p-6 hover:shadow-[0_4px_20px_rgba(59,130,246,0.5)] transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2">
        <div className="relative overflow-hidden ">
          <img
            src={img}
            alt={`Imagem do post: ${title}`}
            className="w-full max-h-50 object-cover h-[200px]"
            title={title}
          />
          <span
            className="absolute bottom-0 right-0 bg-brand-blue-500 text-white font-normal chakra-petch h-[30px] flex justify-center items-center py-2 px-4"
            aria-label={`Categoria: ${category}`}
          >
            {category}
          </span>
        </div>
        <h2 className="font-bold text-xl mt-4 mb-2 chakra-petch line-clamp-2 min-h-[60px]">
          {title}
        </h2>
        <p className="text-brand-blue-300 line-clamp-4">
          {description?.substring(0, 160)}
        </p>
        <div className="mt-5">
          <div className="relative overflow-hidden">
            <span className="text-brand-blue-500 hover:underline font-bold inline-block transition-transform duration-300 group-hover:-translate-y-full">
              Ler mais
            </span>
            <span className="text-brand-blue-500 hover:underline font-bold absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              Ver projeto
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
