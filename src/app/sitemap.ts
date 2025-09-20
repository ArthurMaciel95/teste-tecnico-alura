import { MetadataRoute } from 'next'
import { apiService } from '@/services/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://teste-tecnico-alura-two.vercel.app'

    // URLs estáticas
    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    const postsPerPage = 9
    const maxPages = 5

    try {
        const allPosts = []


        for (let page = 1; page <= maxPages; page++) {
            const response = await apiService.getAllPosts({
                limit: postsPerPage,
                page: page,
            })


            if (!response.posts || response.posts.length === 0) break

            allPosts.push(...response.posts)


            if (response.posts.length < postsPerPage) break
        }

        const postUrls: MetadataRoute.Sitemap = allPosts.map((post) => ({
            url: `${baseUrl}blog/${post.id}`,
            lastModified: post.createdAt ? new Date(post.createdAt) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))

        return [...staticUrls, ...postUrls]
    } catch (error) {
        console.error('Erro ao gerar sitemap:', error)
        return staticUrls
    }
}
