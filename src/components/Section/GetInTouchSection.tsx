import Link from "next/link";
import React from "react";

export const GetInTouchSection = () => {
  return (
    <section className="main_container mx-auto mt-14 mb-10">
      <div className="flex flex-col justify-center items-center gap-10 lg:grid  lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <p className="chakra-petch text-brand-blue-500 font-bold">
            Vamos Conversar?
          </p>
          <h2 className="text-6xl font-bold chakra-petch mt-2 text-brand-blue-600">
            Entre em contato
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-4 ">
              <img src="/svg/mail.svg" alt="Ícone de email" />
              <Link
                href="mailto:contato@exemplo.com"
                className=" underline font-normal text-base text-brand-blue-300"
                aria-label="Enviar email para contato@exemplo.com"
              >
                contato@exemplo.com
              </Link>
            </li>
            <li className="flex items-center gap-4 ">
              <img src="/svg/linkedin.svg" alt="Ícone do LinkedIn" />
              <Link
                href="https://www.linkedin.com/in/exemplo"
                className=" underline font-normal text-base text-brand-blue-300"
                aria-label="Visitar perfil no LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                /Fernanda Mascheti
              </Link>
            </li>
            <li className="flex items-center gap-4 ">
              <img src="/svg/github.svg" alt="Ícone do GitHub" />
              <Link
                href="https://github.com/exemplo"
                className="underline font-normal text-base text-brand-blue-300"
                aria-label="Visitar perfil no GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                fernandamascheti
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
