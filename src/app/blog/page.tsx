"use client";

import React, { useState, useEffect } from "react";
import { FilterSectionAdvanced } from "@/components/Section/FilterSectionAdvanced";
import { PostSection } from "@/components/Section/PostSection";
import { GetInTouchSection } from "@/components/Section/GetInTouchSection";
import { apiService } from "@/services/api";
import { Post } from "@/types/api";

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar posts iniciais
  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        const allPostsResponse = await apiService.getAllPosts();
        setFilteredPosts(allPostsResponse.posts);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  const handleFilterChange = (newPosts: Post[]) => {
    setFilteredPosts(newPosts);
  };

  const handleSearchChange = (newPosts: Post[]) => {
    setFilteredPosts(newPosts);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-brand-blue-500 font-bold text-2xl">
          Carregando...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <img
        src="/svg/gradient.svg"
        className="absolute inset-0 -z-10 mx-auto w-full"
        alt=""
      />

      <FilterSectionAdvanced
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      <PostSection posts={filteredPosts} showPagination={true} />

      <GetInTouchSection />
    </main>
  );
}
