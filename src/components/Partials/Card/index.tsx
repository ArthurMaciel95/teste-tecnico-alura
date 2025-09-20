import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";

interface CardProps {
  img?: string;
  title?: string;
  description?: string;
  category?: string;
  href?: string;
  slug?: string;
  animationDelay?: number;
}

export const Card = ({
  img,
  title,
  description,
  category,
  href,
  animationDelay = 0,
}: CardProps) => {
  return (
    <Fade duration={600} delay={animationDelay} triggerOnce>
      <Link href={href || "#"} aria-label={`Ler mais sobre: ${title}`}>
        <article className="border border-brand-blue-500 min-h-[470px] bg-brand-background rounded-lg p-6 hover:shadow-[0_4px_20px_rgba(59,130,246,0.5)] transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2   ">
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
            <span className="text-brand-blue-500 hover:underline font-bold">
              Ler mais
            </span>
          </div>
        </article>
      </Link>
    </Fade>
  );
};
