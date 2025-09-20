import Link from "next/link";
import React from "react";
import { Slide, Fade } from "react-awesome-reveal";

export const GetInTouchSection = () => {
  return (
    <section className="main_container mx-auto mt-14 mb-10">
      <div className="flex flex-col justify-center items-center gap-10 lg:grid lg:grid-cols-2">
        <Slide direction="left" duration={800} triggerOnce>
          <div className="text-center lg:text-left">
            <Fade duration={600} delay={200} triggerOnce>
              <p className="chakra-petch text-brand-blue-500 font-bold">
                Vamos Conversar?
              </p>
            </Fade>
            <Slide direction="up" duration={800} delay={400} triggerOnce>
              <h2 className="text-6xl font-bold chakra-petch mt-2 text-brand-blue-600">
                Entre em contato
              </h2>
            </Slide>
          </div>
        </Slide>

        <Slide direction="down" duration={800} delay={600} triggerOnce>
          <div className="flex flex-col justify-center items-center">
            <ul className="flex flex-col gap-3">
              <Fade cascade duration={500} delay={800} triggerOnce>
                <li className="flex items-center gap-4">
                  <img src="/svg/mail.svg" alt="Ícone de email" />
                  <Link
                    href="mailto:fernandamascheti@gmail.com"
                    className="underline font-normal text-base text-brand-blue-300"
                    aria-label="Enviar email para mailto:fernandamascheti@gmail.com"
                  >
                    contato@exemplo.com
                  </Link>
                </li>
                <li className="flex items-center gap-4">
                  <img src="/svg/linkedin.svg" alt="Ícone do LinkedIn" />
                  <Link
                    href="https://www.linkedin.com/in/femascheti/"
                    className="underline font-normal text-base text-brand-blue-300"
                    aria-label="Visitar perfil no LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /Fernanda Mascheti
                  </Link>
                </li>
                <li className="flex items-center gap-4">
                  <img src="/svg/github.svg" alt="Ícone do GitHub" />
                  <Link
                    href="https://github.com/femascheti"
                    className="underline font-normal text-base text-brand-blue-300"
                    aria-label="Visitar perfil no GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    fernandamascheti
                  </Link>
                </li>
              </Fade>
            </ul>
          </div>
        </Slide>
      </div>
    </section>
  );
};
