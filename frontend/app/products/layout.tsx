import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Covers — Shop Mobile Covers for Every Brand',
    description: 'Browse our full collection of premium mobile covers for iPhone, Samsung, OnePlus and more. Precision-fit, durable, and stylish.',
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}