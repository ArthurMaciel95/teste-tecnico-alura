import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-center mx-auto max-w-[675px] w-full text-center justify-center mt-20">
      {/* <Zoom duration={800} delay={200} triggerOnce> */}
      <img
        src="/img/avatar.png"
        className="w-[244px] h-[244px] rounded-full"
        alt="Avatar de FERNANDA MASCHETI"
      />
      {/* </Zoom> */}

      {/* <Fade duration={600} delay={600} triggerOnce> */}
      <p className="my-6 text-brand-blue-500 font-bold">
        Olá, meu nome é Fernanda_
      </p>
      {/* </Fade> */}

      {/* <Slide direction="up" duration={800} delay={800} triggerOnce> */}
      <h1 className="text-6xl chakra-petch font-bold leading-[1.1] sm:text-6xl">
        Eu ensino{" "}
        <span className="animated-gradient bg-gradient-to-r from-[var(--color-brand-purple)] via-[var(--color-brand-blue-500)] to-[var(--color-brand-purple)] bg-clip-text text-transparent">
          Programação
        </span>
      </h1>
      {/* </Slide> */}

      {/* <Fade duration={600} delay={1200} triggerOnce> */}
      <p className="text-center max-w-[587px] text-base text-brand-blue-300 font-normal mt-6">
        Sou Engenheira de Computação e Pedagoga. Ensino pensamento computacional
        para estudantes do Ensino Fundamental e Médio. Ensino sobre pensamento
        computacional usando HTML, CSS e JavaScript. Veja os projetos que já
        desenvolvi!
      </p>
      {/* </Fade> */}

      <Slide direction="up" duration={600} delay={1600} triggerOnce>
        <div className="mt-28">
          <img src="/svg/square-detail.svg" alt="Elemento decorativo" />
        </div>
      </Slide>
    </section>
  );
};
