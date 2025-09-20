"use client";

import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Post } from "@/types/api";
import { RelationsPostsSection } from "../Section/RelationsPostsSection";

interface BlogPostContentProps {
  post: Post;
  relatedPosts: Post[];
}

export const BlogPostContent = ({
  post,
  relatedPosts,
}: BlogPostContentProps) => {
  return (
    <section className="main_container mx-auto py-20 relative mt-20">
      {/* Hero Section com título e imagem */}
      <Fade cascade duration={400} delay={1000} triggerOnce>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reverse">
          <div className="flex flex-col lg:order-1 order-2">
            <h1 className="text-5xl font-bold chakra-petch mb-6 text-brand-blue-600 max-w-[536px]">
              {post.title}
            </h1>

            <div className="flex flex-col gap-4 mb-6">
              <strong className="text-brand-blue-300 font-bold">
                Categoria:
              </strong>
              <span className="py-2 px-4 bg-brand-blue-500 font-bold cursor-pointer text-white w-fit rounded-sm">
                {post.category.name}
              </span>
            </div>

            <strong className="text-brand-blue-300 font-bold mb-5">
              Tags:
            </strong>

            <div className="flex gap-3 flex-wrap">
              {post.tags &&
                post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="py-2 px-4 transition-colors duration-300 bg-white border hover:bg-brand-gray-100/10 cursor-pointer border-brand-blue-500 text-brand-blue-500 font-bold w-fit rounded-sm"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>
          </div>

          <div className="w-full order-1 lg:order-2">
            <Zoom duration={800} delay={400} triggerOnce>
              <img
                src={post.imageUrl || "/temp/post-image.png"}
                className="w-full h-auto rounded-lg shadow-lg"
                alt={post.title}
              />
            </Zoom>
          </div>
        </div>
      </Fade>
      {/* Conteúdo do artigo */}
      {post.content && (
        <Fade duration={800} delay={400} triggerOnce>
          <article className="text-brand-blue-300 mt-10">
            {post.content}
          </article>
        </Fade>
      )}

      {/* Posts relacionados */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 my-20">
          <Slide direction="up" duration={600} delay={200} triggerOnce>
            <h2 className="text-2xl font-bold chakra-petch text-brand-blue-600 mb-6">
              Postagens relacionadas
            </h2>
          </Slide>
          <Fade duration={800} delay={400} triggerOnce>
            <RelationsPostsSection RelationsPosts={relatedPosts} />
          </Fade>
        </div>
      )}
    </section>
  );
};
