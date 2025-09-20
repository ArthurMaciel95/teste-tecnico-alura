import React from "react";
import { Card } from "../Partials/Card";
import { apiService } from "@/services/api";
import { Post } from "@/types/api";

interface PostSectionProps {
  posts?: Post[];
  showPagination?: boolean;
}

export const PostSection = async ({
  posts,
  showPagination = true,
}: PostSectionProps) => {
  // Se não receber posts como prop, busca da API
  const postsData = posts || (await apiService.getAllPosts());

  // Garantir que temos pelo menos alguns posts para mostrar
  console.log("Posts carregados:", postsData.length);

  return (
    <section className="main_container  mx-auto mt-8 mb-20">
      {postsData.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-brand-blue-300 text-lg">Nenhum post encontrado.</p>
        </div>
      ) : (
        <>
          <div className="  grid md:grid-cols-3  grid-cols-1 gap-8 ">
            {postsData.map((post) => (
              <Card
                key={post.id}
                slug={`/blog/${post.id}`}
                img={post.imageUrl || "/temp/post-image.png"}
                title={post.title}
                description={
                  post.content ? post.content.substring(0, 200) + "..." : ""
                }
                category={post.category.name}
                href={`/blog/${post.id}`}
              />
            ))}
          </div>

          {showPagination && postsData.length > 0 && (
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
          )}
        </>
      )}
    </section>
  );
};
