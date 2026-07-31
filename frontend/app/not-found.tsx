import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-xl w-full text-center space-y-8">
                <div>
                    <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter text-primary">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-black uppercase italic mt-4">
                        Page Not <span className="text-primary italic">Found</span>
                    </h2>
                    <p className="text-muted-foreground font-medium mt-4">
                        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                        Let&apos;s get you back on track.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button className="w-full h-14 rounded-full px-10 font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-primary/30 group">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link href="/products" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="w-full h-14 rounded-full px-10 border-2 font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            Browse Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}