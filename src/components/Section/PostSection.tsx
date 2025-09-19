import React from "react";
import { Card } from "../Partials/Card";

export const PostSection = () => {
  return (
    <section className="main_container mx-auto mt-8 grid md:grid-cols-3  grid-cols-1 gap-8 mb-20">
      <Card
        img="/temp/post-image.png"
        title="Desenvolvendo uma ferramenta interativa de estudo"
        description="Este projeto tem como objetivo criar uma ferramenta que facilite o aprendizado de forma interativa e envolvente."
        category="Front-end"
        href="/post/1"
      />
    </section>
  );
};
