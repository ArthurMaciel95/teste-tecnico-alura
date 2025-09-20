import { MetadataRoute } from 'next'
import { apiService } from '@/services/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fernanda-mascheti.vercel.app'

    // URLs estáticas
    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    // URLs dinâmicas dos posts do blog
    try {
        const postsResponse = await apiService.getAllPosts({ limit: 100 })
        const posts = postsResponse.posts

        const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.id}`,
            lastModified: post.createdAt ? new Date(post.createdAt) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))

        return [...staticUrls, ...postUrls]
    } catch (error) {
        console.error('Erro ao gerar sitemap:', error)
        // Retorna apenas URLs estáticas em caso de erro
        return staticUrls
    }
}