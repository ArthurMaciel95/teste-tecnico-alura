import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://fernanda-mascheti.vercel.app'

    return {
        rules: {
            userAgent: '*',
            allow: '/',

        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}