"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Stats() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const counters = gsap.utils.toArray<HTMLElement>(".counter-number");

        counters.forEach((el) => {
            const target = Number(el.getAttribute("data-target"));
            const obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                },
                onUpdate: () => {
                    el.textContent = Math.floor(obj.val) + (el.dataset.suffix || "");
                },
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-black text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-16">
                <div className="text-center">
                    <p className="counter-number text-6xl md:text-7xl font-black text-primary" data-target="98" data-suffix="%">0%</p>
                    <p className="text-lg text-gray-300 mt-2">Customers loved our cases</p>
                </div>
                <div className="text-center">
                    <p className="counter-number text-6xl md:text-7xl font-black text-primary" data-target="10000" data-suffix="+">0+</p>
                    <p className="text-lg text-gray-300 mt-2">Cases sold across India</p>
                </div>
                <div className="text-center">
                    <p className="counter-number text-6xl md:text-7xl font-black text-primary" data-target="24">0</p>
                    <p className="text-lg text-gray-300 mt-2">Hour dispatch time</p>
                </div>
            </div>
        </section>
    );
}