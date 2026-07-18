"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PinnedShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".pin-panel");
        panels.forEach((panel, i) => {
            const isLast = i === panels.length - 1;
            ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                end: "+=50%",
                pin: true,
                pinSpacing: isLast ? true : false,
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            <section className="pin-panel h-screen w-full flex items-center justify-center bg-primary text-white">
                <div className="text-center px-8 max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-4">Premium Quality</h2>
                    <p className="text-xl">Har case 12-point durability test se guzarta hai, tabhi tum tak pahunchta hai.</p>
                </div>
            </section>
            <section className="pin-panel h-screen w-full flex items-center justify-center bg-yellow-400 text-black">
                <div className="text-center px-8 max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-4">Fast Shipping</h2>
                    <p className="text-xl">Metro cities mein 2-din delivery guaranteed.</p>
                </div>
            </section>
            <section className="pin-panel h-screen w-full flex items-center justify-center bg-black text-white">
                <div className="text-center px-8 max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-4">100+ Devices</h2>
                    <p className="text-xl">Har phone model ke liye perfect fit.</p>
                </div>
            </section>
        </div>
    );
}