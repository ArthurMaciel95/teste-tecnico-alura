import { Post, ApiResponse } from '@/types/api';

const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiService {
  private async fetchData<T>(endpoint: string): Promise<T> {

    const response = await fetch(`${BASEURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache por 5 minutos para melhor performance
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  // GET /api/posts - Todas as postagens com paginação
  async getAllPosts(params?: { limit?: number, page?: number }): Promise<ApiResponse> {
    try {
      const { limit = 6, page = 1 } = params || {};
      const data = await this.fetchData<ApiResponse>(`/api/posts?limit=${limit}&page=${page}`);

      return data;
    } catch (error) {
      console.error('Erro ao buscar todos os posts:', error);
      return {
        posts: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalPosts: 0,
          postsPerPage: params?.limit || 6,
          hasNextPage: false,
          hasPreviousPage: false
        }
      };
    }
  }

  // GET /api/posts/category/[category] - Postagens por categoria com paginação
  async getPostsByCategory(
    category: string,
    params?: { limit?: number, page?: number }
  ): Promise<ApiResponse> {
    try {
      const { limit = 6, page = 1 } = params || {};
      const data = await this.fetchData<ApiResponse>(
        `/api/posts/category/${encodeURIComponent(category)}?limit=${limit}&page=${page}`
      );
      return data;
    } catch (error) {
      console.error(`Erro ao buscar posts da categoria ${category}:`, error);
      return {
        posts: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalPosts: 0,
          postsPerPage: params?.limit || 6,
          hasNextPage: false,
          hasPreviousPage: false
        }
      };
    }
  }

  // GET /api/posts/id/[id] - Postagem específica por ID
  async getPostById(id: string): Promise<Post | null> {
    try {
      const data = await this.fetchData<{ post: Post }>(`/api/posts/id/${id}`);
      return data.post || null;
    } catch (error) {
      console.error(`Erro ao buscar post com ID ${id}:`, error);
      return null;
    }
  }

  // Posts relacionados (com base em categoria ou gerais)
  async getRelatedPosts(slug?: string): Promise<Post[]> {
    try {
      if (slug) {
        const postsResponse = await this.getPostsByCategory(slug, { limit: 3 });
        return postsResponse.posts.slice(0, 3);
      }

      const allPostsResponse = await this.getAllPosts({ limit: 3 }); // Buscar 3 posts para relacionados
      return allPostsResponse.posts;
    } catch (error) {
      console.error('Erro ao buscar posts relacionados:', error);
      return [];
    }
  }

  // Busca de posts (client-side)
  async searchPosts(query: string): Promise<Post[]> {
    try {
      const allPostsResponse = await this.getAllPosts({ limit: 50 }); // Buscar mais posts para pesquisa
      const searchLower = query.toLowerCase();

      return allPostsResponse.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          (post.content &&
            post.content.toLowerCase().includes(searchLower)) ||
          post.category.name.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchLower)
          )
      );
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      return [];
    }
  }

  // Categorias disponíveis
  async getCategories(): Promise<{ slug: string; name: string }[]> {
    try {
      const postsResponse = await this.getAllPosts();
      const categoriesMap = new Map<string, { slug: string; name: string }>();

      postsResponse.posts.forEach((post) => {
        const { slug, name } = post.category;
        if (!categoriesMap.has(slug)) {
          categoriesMap.set(slug, { slug, name });
        }
      });

      return Array.from(categoriesMap.values());
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  }

  // Tags disponíveis
  async getTags(): Promise<string[]> {
    try {
      const postsResponse = await this.getAllPosts();
      const allTags = postsResponse.posts.flatMap((post) =>
        post.tags.map((tag) => tag.name)
      );
      const uniqueTags = [...new Set(allTags)];
      return uniqueTags.filter(Boolean);
    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      return [];
    }
  }
}

// Instância singleton
export const apiService = new ApiService();
export default apiService;
