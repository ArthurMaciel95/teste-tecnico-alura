import React from "react";
import Link from "next/link";
import { Card } from "../Partials/Card";
import { apiService } from "@/services/api";
import { Post, ApiResponse } from "@/types/api";

interface PostSectionProps {
  showPagination?: boolean;
  page?: number;
  posts?: Post[];
}

export const PostSection = async ({
  showPagination = true,
  page = 1,
  posts,
}: PostSectionProps) => {
  // Se posts não foram passados como prop, busca da API
  let postsData: Post[] = [];
  let pagination: ApiResponse["pagination"] | undefined;

  if (posts) {
    postsData = posts;
  } else {
    try {
      const response = await apiService.getAllPosts({
        limit: 6,
        page: page,
      });
      postsData = response.posts;
      pagination = response.pagination;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }

  return (
    <section className="main_container mx-auto mt-8 mb-20">
      {postsData.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-brand-blue-300 text-lg">Nenhum post encontrado.</p>
        </div>
      ) : (
        <>
          {/* Lista de posts */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {postsData.map((post) => (
              <Card
                key={post.id}
                img={post.imageUrl || "/temp/post-image.png"}
                title={post.title}
                description={post.content}
                category={post.category.name}
                href={`/blog/${post.id}`}
              />
            ))}
          </div>

          {/* Paginação */}
          {showPagination && pagination && pagination.totalPages > 1 && (
            <div className="mt-5 flex justify-center gap-4">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`?page=${pageNum}`}
                  className={`py-2 h-10 w-8 cursor-pointer text-white font-bold rounded-md text-center flex items-center justify-center ${
                    pageNum === pagination.currentPage
                      ? "bg-brand-blue-600"
                      : "bg-brand-blue-300"
                  }`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
