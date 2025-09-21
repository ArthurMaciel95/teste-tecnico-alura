"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Post } from "@/types/api";
import { Card } from "@/components/Partials/Card";
import { Button } from "@/components/Partials/Buttons/Button";
import { useDebounce } from "@/hooks/useDebounce";

interface PostListProps {
  posts: Post[];
  categories: { slug: string; name: string }[];
  selectedCategory: string | null;
  totalPages: number;
  currentPage: number;
  searchQuery?: string;
}

export function PostList({
  posts: initialPosts,
  categories,
  selectedCategory: initialSelectedCategory,
  totalPages,
  currentPage,
  searchQuery: initialSearchQuery = "",
}: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialSelectedCategory
  );
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // Debounce da busca para evitar muitas chamadas
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Atualizar URL com parâmetros de busca
  const updateURL = useCallback(
    (params: Record<string, string | null>) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== "") {
          urlParams.set(key, value);
        } else {
          urlParams.delete(key);
        }
      });

      // Sempre resetar para página 1 quando filtrar
      if (params.search !== undefined || params.category !== undefined) {
        urlParams.delete("page");
      }

      const newURL = `/?${urlParams.toString()}`;
      router.push(newURL, { scroll: false });
    },
    [router, searchParams]
  );

  // Filtrar posts localmente
  useEffect(() => {
    let filtered = initialPosts;

    // Não filtrar por categoria se já foi filtrado no servidor (initialSelectedCategory)
    // Só filtrar localmente se mudarmos a categoria no cliente
    if (selectedCategory && !initialSelectedCategory) {
      // Filtro local por categoria apenas se não havia categoria inicial
      filtered = filtered.filter(
        (post) => post.category.slug === selectedCategory
      );
    }

    // Filtro por busca (sempre aplicado localmente) - usando valor debouncado
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          (post.content && post.content.toLowerCase().includes(query)) ||
          post.category.name.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [
    initialPosts,
    selectedCategory,
    debouncedSearchQuery,
    initialSelectedCategory,
  ]);

  // Atualizar URL apenas quando o valor debouncado mudar
  useEffect(() => {
    if (debouncedSearchQuery !== initialSearchQuery) {
      updateURL({ search: debouncedSearchQuery, category: selectedCategory });
    }
  }, [debouncedSearchQuery, selectedCategory, initialSearchQuery, updateURL]);

  // Manipular busca - apenas atualiza o estado local
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Não chama updateURL aqui - será chamado pelo useEffect quando o valor for debouncado
  };

  // Manipular seleção de categoria
  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    updateURL({ category: categorySlug, search: debouncedSearchQuery });
  };

  // Manipular paginação
  const handlePageChange = (page: number) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      urlParams.set("page", page.toString());
    } else {
      urlParams.delete("page");
    }

    // Usar scroll: false para evitar scroll automático para o topo
    router.push(`/?${urlParams.toString()}`, { scroll: false });

    // Fazer scroll suave para a seção de posts
    setTimeout(() => {
      const postsSection = document.getElementById("blog");
      if (postsSection) {
        postsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100); // Pequeno delay para garantir que a navegação foi processada
  };

  // Limpar filtros
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    router.push("/", { scroll: false });
  };

  return (
    <div className="main_container mx-auto" id="blog">
      {/* Seção de Filtros */}
      <section className="mt-20 flex justify-between flex-col md:flex-row gap-6">
        <div className="flex gap-8 items-center flex-col lg:flex-row w-full md:w-auto">
          <h3 className="text-brand-blue-600 chakra-petch font-bold text-2xl">
            Minhas postagens
          </h3>
          <div className="relative">
            <label htmlFor="search-input" className="sr-only">
              Buscar posts
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearch}
              className="h-10 border w-full border-brand-blue-500 bg-background text-foreground outline-none rounded-md p-2 px-3.5 focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent placeholder:text-muted-foreground"
              aria-label="Campo de busca de posts"
            />
            <Image
              src="/svg/search.svg"
              alt="Ícone de busca"
              width={24}
              height={24}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex gap-5 items-center flex-col lg:flex-row w-full md:w-auto">
          <h5 className="text-brand-blue-600 chakra-petch font-bold text-lg">
            Categorias:
          </h5>
          <div className="flex gap-4 flex-wrap max-w-[450px]">
            <Button
              onClick={() => handleCategorySelect(null)}
              isSelected={selectedCategory === null}
            >
              Todas
            </Button>
            {categories.map((category) => (
              <Button
                key={category.slug}
                onClick={() => handleCategorySelect(category.slug)}
                isSelected={selectedCategory === category.slug}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="mt-12">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                img={post.imageUrl}
                title={post.title}
                description={
                  post.content
                    ? post.content.replace(/<[^>]*>/g, "").substring(0, 150) +
                      "..."
                    : ""
                }
                category={post.category.name}
                href={`/blog/${post.id}`}
                animationDelay={index * 100}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery || selectedCategory
                ? "Nenhum post encontrado com os filtros aplicados."
                : "Nenhum post disponível no momento."}
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="mt-4 text-brand-blue-500 hover:text-brand-blue-600 underline"
              >
                Ver todos os posts
              </button>
            )}
          </div>
        )}
      </section>

      {/* Paginação */}
      {!searchQuery && totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          {/* Página anterior */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 border cursor-pointer border-brand-blue-500 text-brand-blue-500 rounded-md hover:bg-brand-blue-500 hover:text-white transition-colors"
            >
              Anterior
            </button>
          )}

          {/* Números das páginas */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                page === currentPage
                  ? "bg-brand-blue-500 text-white"
                  : "border border-brand-blue-500 text-brand-blue-500 hover:bg-brand-blue-500 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Próxima página */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 border border-brand-blue-500 cursor-pointer text-brand-blue-500 rounded-md hover:bg-brand-blue-500 hover:text-white transition-colors"
            >
              Próxima
            </button>
          )}
        </div>
      )}
    </div>
  );
}
