"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../Partials/Buttons/Button";
import { apiService } from "@/services/api";
import { Post } from "@/types/api";

interface FilterSectionProps {
  onFilterChange: (posts: Post[]) => void;
  onSearchChange: (posts: Post[]) => void;
}

export const FilterSectionAdvanced = ({
  onFilterChange,
  onSearchChange,
}: FilterSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar categorias disponíveis
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await apiService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    loadCategories();
  }, []);

  // Função para filtrar por categoria
  const handleCategoryFilter = async (category: string) => {
    setIsLoading(true);
    try {
      if (selectedCategory === category) {
        // Se já estiver selecionada, remove o filtro
        setSelectedCategory("");
        const allPosts = await apiService.getAllPosts();
        onFilterChange(allPosts);
      } else {
        // Aplica o filtro da categoria
        setSelectedCategory(category);
        const filteredPosts = await apiService.getPostsByCategory(category);
        onFilterChange(filteredPosts);
      }
    } catch (error) {
      console.error("Erro ao filtrar por categoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para buscar posts
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

    try {
      if (query.trim() === "") {
        // Se a busca estiver vazia, volta para todos os posts ou categoria selecionada
        if (selectedCategory) {
          const filteredPosts = await apiService.getPostsByCategory(
            selectedCategory
          );
          onSearchChange(filteredPosts);
        } else {
          const allPosts = await apiService.getAllPosts();
          onSearchChange(allPosts);
        }
      } else {
        // Realiza a busca
        const searchResults = await apiService.searchPosts(query);
        onSearchChange(searchResults);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main_container mx-auto mt-20 flex justify-between">
      <div className="flex gap-8 items-center">
        <h3 className="text-brand-blue-600 chakra-petch font-bold text-2xl">
          Minhas postagens
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="h-10 border w-full border-brand-blue-500 outline-none rounded-md p-2 px-3.5 disabled:opacity-50"
            disabled={isLoading}
          />
          <img
            src="/svg/search.svg"
            alt="ícone de busca"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h5 className="text-brand-blue-600 chakra-petch font-bold text-lg">
          Categorias:
        </h5>
        <div className="flex gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              isActive={selectedCategory === category}
              disabled={isLoading}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <div className="text-brand-blue-500 font-bold">Carregando...</div>
        </div>
      )}
    </section>
  );
};
