import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhoneModelSection } from '@/components/PhoneModelSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 bg-secondary/50">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Protect Your Phone in Style
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Premium mobile covers for iPhone, Samsung, OnePlus and more.
            Designed in India, for the world.
          </p>
          <div className="space-x-4">
            <Link href="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg">Join Coverly</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
            Best Sellers
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Catch the trend with our most popular designs.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {/* Static placeholders for now, in prod fetch from API */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6 bg-muted">
                {/* Image placeholder */}
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-bold">Abstract Art {i}</h3>
                <p className="text-sm text-muted-foreground">iPhone 14 Pro Max</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">₹ 499</span>
                  <Button size="sm" variant="secondary">Add</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PhoneModelSection />
    </div>
  );
}
