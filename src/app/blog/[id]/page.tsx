import React from "react";
import { apiService } from "@/services/api";
import { BlogPostContent } from "@/components/BlogPost/BlogPostContent";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    // fetch post information
    const post = await apiService.getPostById(id);

    if (!post) {
      return {
        title: "Post não encontrado - Fernanda Mascheti",
        description: "O post solicitado não foi encontrado.",
      };
    }

    const baseUrl = "https://teste-tecnico-alura-two.vercel.app";
    const postImageUrl = post.imageUrl
      ? post.imageUrl.startsWith("http")
        ? post.imageUrl
        : `${baseUrl}${post.imageUrl}`
      : `${baseUrl}/seo.png`;

    const description = post.content
      ? post.content.replace(/<[^>]*>/g, "").substring(0, 160) + "..."
      : `Leia o post "${post.title}" no blog da Fernanda Mascheti.`;

    return {
      title: `${post.title} | Fernanda Mascheti`,
      description,
      keywords: [
        ...(post.tags?.map((tag) => tag.name) || []),
        post.category?.name,
        "blog",
        "tecnologia",
        "programação",
      ].filter(Boolean),
      authors: [{ name: "Fernanda Mascheti" }],
      creator: "Fernanda Mascheti",
      publisher: "Fernanda Mascheti",
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: `/blog/${id}`,
      },
      openGraph: {
        title: `${post.title} | Fernanda Mascheti`,
        description,
        url: `${baseUrl}/blog/${id}`,
        siteName: "Fernanda Mascheti",
        images: [
          {
            url: postImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: "pt_BR",
        type: "article",
        publishedTime: post.createdAt,
        authors: ["Fernanda Mascheti"],
        section: post.category?.name,
        tags: post.tags?.map((tag) => tag.name),
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | Fernanda Mascheti`,
        description,
        images: [postImageUrl],
        creator: "@fernandamascheti",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Erro ao gerar metadata para o post:", error);
    return {
      title: "Erro ao carregar post - Fernanda Mascheti",
      description: "Ocorreu um erro ao carregar o post solicitado.",
    };
  }
}

const BlogPostPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;

  // Buscar o post específico
  const post = await apiService.getPostById(resolvedParams.id);

  if (!post) {
    notFound();
  }

  // Buscar posts relacionados
  const relatedPosts = await apiService.getRelatedPosts(post.category.slug);

  return (
    <main className="">
      <img
        src="/svg/gradient.svg"
        className="absolute w-full top-0 z-10  inset-0 mx-auto -z-10"
        alt="Elemento decorativo de fundo"
      />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </main>
  );
};

export default BlogPostPage;
