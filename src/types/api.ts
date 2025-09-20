// Tipos para os dados da API
export interface Post {
    id: string;
    title: string;
    content?: string;
    author?: string;
    createdAt?: string;
    likes?: number;
    category: {
        slug: string;
        name: string;
        description?: string;
    };
    tags: {
        slug: string;
        name: string;
    }[];
    imageUrl: string;
}

export interface ApiResponse {
    posts: Post[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalPosts: number;
        postsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    meta?: {
        generatedAt: string;
        seed?: string;
    };
}