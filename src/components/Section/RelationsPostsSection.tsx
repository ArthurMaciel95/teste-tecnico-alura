import React from "react";
import { Card } from "../Partials/Card";
import { RelationsPostsProps } from "@/@types";

export const RelationsPostsSection = ({
  RelationsPosts,
}: RelationsPostsProps) => {
  return (
    <section className="main_container mx-auto my-20">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {RelationsPosts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            category={post.category}
            href={`/blog/${post.id}`}
            img="/temp/post-image.png"
            slug={post.slug}
            alt="computador"
            description={post.description}
          />
        ))}
      </div>
    </section>
  );
};
