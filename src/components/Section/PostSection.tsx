import React from "react";
import { Card } from "../Partials/Card";

export const PostSection = () => {
  return (
    <section className="main_container  mx-auto mt-8 mb-20">
      <div className="  grid md:grid-cols-3  grid-cols-1 gap-8 ">
        <Card
          slug="/blog/1"
          img="/temp/post-image.png"
          title="Desenvolvendo uma ferramenta interativa de estudo"
          description="Este projeto tem como objetivo criar uma ferramenta que facilite o aprendizado de forma interativa e envolvente."
          category="Front-end"
          href="/post/1"
        />
      </div>
      <div className="mt-5 flex justify-center">
        <button className="py-2 h-10 w-8 cursor-pointer bg-brand-blue-600 text-white font-bold rounded-md">
          1
        </button>
        <button className="py-2 h-10 w-8 cursor-pointer   text-white font-bold bg-brand-gray-100 rounded-md ml-2">
          2
        </button>
        <button className="py-2 h-10 cursor-pointer w-8 text-white font-bold bg-brand-gray-100 rounded-md ml-2">
          3
        </button>
      </div>
    </section>
  );
};
