import { PHONE_MODELS } from "@/lib/phone-models";

export function PhoneModelSection() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">
                        Supported Models
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        We have covers for a wide range of devices. Find yours below.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {PHONE_MODELS.map((brand) => (
                        <div
                            key={brand.brand}
                            className="flex flex-col space-y-2 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <h3 className="font-bold text-xl mb-2 text-primary">{brand.brand}</h3>
                            <ul className="space-y-1 text-sm text-muted-foreground max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
                                {brand.models.map((model) => (
                                    <li key={model} className="flex items-center">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/60" />
                                        {model}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
