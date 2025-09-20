import React from "react";

const page = () => {
  return (
    <main className="min-h-screen">
      <section className="main_container mx-auto py-20 relative">
        <div className="absolute   mx-auto -z-10">
          <img src="/svg/gradient.svg" alt="" />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold chakra-petch mb-6 text-brand-blue-600 max-w-[536px]">
              Desenvolvendo uma ferramenta interativa de estudo
            </h1>
            <div className=" flex flex-col gap-4 mb-6">
              <strong className="text-brand-blue-300 font-bold">
                Categoria:
              </strong>
              <span className="py-2 px-4 bg-brand-blue-500 font-bold cursor-pointer text-white w-fit rounded-sm">
                Front-end
              </span>
            </div>
            <strong className="text-brand-blue-300 font-bold mb-5">
              Tags:
            </strong>
            <div className="flex gap-3 flex-wrap">
              <span className="py-2 px-4 transition-colors duration-300 bg-white border hover:bg-brand-gray-100/10 cursor-pointer border-brand-blue-500 text-brand-blue-500 font-bold  w-fit rounded-sm">
                HTML
              </span>
              <span className="py-2 px-4 transition-colors duration-300 bg-white border hover:bg-brand-gray-100/10 cursor-pointer border-brand-blue-500 text-brand-blue-500 font-bold  w-fit rounded-sm">
                CSS
              </span>
              <span className="py-2 px-4 transition-colors duration-300 bg-white border hover:bg-brand-gray-100/10 cursor-pointer border-brand-blue-500 text-brand-blue-500 font-bold  w-fit rounded-sm">
                JavaScript
              </span>
            </div>
          </div>
          <div className="w-full">
            <img
              src="/temp/post-image.png"
              className="w-full h-auto"
              alt="imagem de um computador"
            />
          </div>
        </div>
        <article className="mt-16 text-brand-blue-300 leading-7">
          Lorem ipsum dolor sit amet consectetur. Et morbi egestas facilisis
          neque gravida in diam fermentum. Leo sed eu donec mi elit facilisis id
          tortor. Vitae sagittis nunc duis mattis risus id. Quis lacus hendrerit
          eget vitae id. Pulvinar turpis sit pellentesque ac enim. Maecenas
          luctus cum ultricies dui auctor ullamcorper consequat sodales. Egestas
          dis semper mauris proin. Risus tellus ullamcorper leo tristique.
          Tellus mollis pharetra risus viverra vel elementum semper et. Ac risus
          aliquam semper eros quam aenean. Nunc mauris ut sem volutpat. Nulla
          sem pharetra in ac. Velit tristique nibh vitae pellentesque sed quam
          diam dolor enim. Pulvinar ut feugiat ultricies sem sed neque viverra.
          Netus donec sit nam tortor vitae ac adipiscing non placerat.
        </article>
        <div className="mt-16">
          <h2 className="text-2xl font-bold chakra-petch text-brand-blue-600 mb-6">
            Postagens relacionadas
          </h2>
        </div>
      </section>
    </main>
  );
};

export default page;
