import React from "react";
import { Button } from "../Partials/Buttons/Button";

export const FilterSection = () => {
  return (
    <section className="main_container mx-auto mt-20 flex justify-between flex-col md:flex-row gap-6">
      <div className="flex gap-8 items-center flex-col lg:flex-row w-full md:w-auto">
        <h3 className="text-brand-blue-600 chakra-petch font-bold text-2xl">
          Minha postagens
        </h3>
        <div className="relative ">
          <input
            type="text"
            placeholder="Buscar..."
            className="h-10 border w-full border-brand-blue-500 outline-none rounded-md p-2 px-3.5"
          />
          <img
            src="/svg/search.svg"
            alt="icone de busca"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
      </div>
      <div className="flex gap-5 items-center flex-col lg:flex-row w-full md:w-auto">
        <h5 className="text-brand-blue-600 chakra-petch font-bold text-lg">
          Categorias:
        </h5>
        <div className="flex gap-4 ">
          <Button>IA</Button>
          <Button>Front-end</Button>
          <Button>Back-end</Button>
        </div>
      </div>
    </section>
  );
};
