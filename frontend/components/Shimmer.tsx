export function ShimmerBox({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-muted rounded-lg ${className}`} />
    );
}

export function ShimmerText({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-muted rounded h-4 ${className}`} />
    );
}

export function ShimmerCircle({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-muted rounded-full ${className}`} />
    );
}