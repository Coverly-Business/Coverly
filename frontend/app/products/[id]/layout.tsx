import type { Metadata } from 'next';
import { API_BASE_URL } from '@/config/api';

async function getProduct(id: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: 'no-store' });
        const data = await res.json();
        return data.success ? data.data : null;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const product = await getProduct(params.id);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: product.name,
        description: product.description?.slice(0, 155) || 'Premium mobile cover from Coverly.',
        openGraph: {
            title: product.name,
            description: product.description?.slice(0, 155),
            images: product.images?.[0] ? [product.images[0]] : [],
        },
    };
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}