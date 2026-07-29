import { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/config/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://coverly-nine.vercel.app';

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${baseUrl}`, lastModified: new Date(), priority: 1 },
        { url: `${baseUrl}/products`, lastModified: new Date(), priority: 0.9 },
        { url: `${baseUrl}/track-order`, lastModified: new Date(), priority: 0.5 },
        { url: `${baseUrl}/faqs`, lastModified: new Date(), priority: 0.4 },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), priority: 0.3 },
        { url: `${baseUrl}/terms-of-use`, lastModified: new Date(), priority: 0.3 },
        { url: `${baseUrl}/shipping-policy`, lastModified: new Date(), priority: 0.3 },
        { url: `${baseUrl}/return-refund`, lastModified: new Date(), priority: 0.3 },
    ];

    let productPages: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        if (data.success) {
            productPages = data.data.map((p: any) => ({
                url: `${baseUrl}/products/${p._id}`,
                lastModified: new Date(),
                priority: 0.7,
            }));
        }
    } catch (err) {
        console.error('Sitemap: failed to fetch products', err);
    }

    return [...staticPages, ...productPages];
}