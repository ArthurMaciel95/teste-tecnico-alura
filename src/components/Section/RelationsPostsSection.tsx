import React from "react";
import { Card } from "../Partials/Card";
import { Post } from "@/types/api";

interface RelationsPostsSectionProps {
  RelationsPosts: Post[];
}

export const RelationsPostsSection = ({
  RelationsPosts,
}: RelationsPostsSectionProps) => {
  return (
    <section className="  ">
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">
        {RelationsPosts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            category={post.category.name}
            href={`/blog/${post.id}`}
            img={post.imageUrl || "/temp/post-image.png"}
            slug={`/blog/${post.id}`}
            description={post.content}
          />
        ))}
      </div>
    </section>
  );
};
