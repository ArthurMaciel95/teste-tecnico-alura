import { HeroSection } from "../components/Section/HeroSection";
import { GetInTouchSection } from "@/components/Section/GetInTouchSection";
import { PostList } from "@/components/PostList";
import { apiService } from "@/services/api";

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const searchQuery = params?.search || "";
  const selectedCategory = params?.category || null;

  // Buscar posts com filtros
  let postsResponse;

  if (selectedCategory) {
    // Se há uma categoria selecionada, buscar posts dessa categoria com paginação
    postsResponse = await apiService.getPostsByCategory(selectedCategory, {
      limit: 6,
      page: currentPage,
    });
  } else {
    // Se não há categoria, buscar todos os posts com paginação
    postsResponse = await apiService.getAllPosts({
      limit: 6,
      page: currentPage,
    });
  }

  // Buscar categorias para o filtro
  const categories = await apiService.getCategories();

  return (
    <main id="main-content" className="relative ">
      <HeroSection />
      <PostList
        posts={postsResponse.posts}
        categories={categories}
        selectedCategory={selectedCategory}
        totalPages={postsResponse.pagination?.totalPages || 1}
        currentPage={postsResponse.pagination?.currentPage || 1}
        searchQuery={searchQuery}
      />

      <GetInTouchSection />
    </main>
  );
}
