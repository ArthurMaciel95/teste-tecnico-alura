import React from "react";
import { apiService } from "@/services/api";
import { RelationsPostsSection } from "@/components/Section/RelationsPostsSection";
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

  // fetch post information
  const post = await apiService.getPostById(id);

  return {
    title: `FERNANDA MARSCHETI | ${post?.title}`,
    description: `${post?.content?.substring(0, 160)}...`,
    openGraph: {
      title: `FERNANDA MARSCHETI | ${post?.title}`,
      description: `${post?.content?.substring(0, 160)}...`,
      images: [
        {
          url: post?.imageUrl || "/temp/post-image.png",
          width: 1200,
          height: 627,
          alt: post?.title,
        },
      ],
    },
  };
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
    <main className="min-h-screen mt-20">
      <section className="main_container mx-auto py-20 relative">
        <div className="absolute   mx-auto -z-10">
          <img src="/svg/gradient.svg" className="w-full" alt="" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reverse">
          <div className="flex flex-col lg:order-1 order-2">
            <h1 className="text-5xl font-bold chakra-petch mb-6 text-brand-blue-600 max-w-[536px]">
              {post.title}
            </h1>
            <div className=" flex flex-col gap-4 mb-6">
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
                    className="py-2 px-4 transition-colors duration-300 bg-white border hover:bg-brand-gray-100/10 cursor-pointer border-brand-blue-500 text-brand-blue-500 font-bold  w-fit rounded-sm"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>
          </div>
          <div className="w-full order-1 lg:order-2">
            <img
              src={post.imageUrl || "/temp/post-image.png"}
              className="w-full h-auto"
              alt={post.title}
            />
          </div>
        </div>
        <article className="mt-16 text-brand-blue-300 leading-7">
          {post.content && (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-16  my-20">
            <h2 className="text-2xl font-bold chakra-petch text-brand-blue-600 mb-6">
              Postagens relacionadas
            </h2>
            <RelationsPostsSection RelationsPosts={relatedPosts} />
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogPostPage;
