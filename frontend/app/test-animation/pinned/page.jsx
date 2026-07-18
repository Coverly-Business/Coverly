"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedTest() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".panel");

        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                end: "+=100%",
                pin: true,
                pinSpacing: false,
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>

            {/* Panel 1 - Purple */}
            <section className="panel h-screen w-full flex items-center justify-center bg-purple-600 text-white">
                <div className="text-center px-8">
                    <h2 className="text-5xl font-black mb-4">Premium Quality</h2>
                    <p className="text-xl">Har case 12-point durability test se guzarta hai</p>
                </div>
            </section>

            {/* Panel 2 - Yellow */}
            <section className="panel h-screen w-full flex items-center justify-center bg-yellow-400 text-black">
                <div className="text-center px-8">
                    <h2 className="text-5xl font-black mb-4">Fast Shipping</h2>
                    <p className="text-xl">Metro cities mein 2-din delivery guaranteed</p>
                </div>
            </section>

            {/* Panel 3 - Black */}
            <section className="panel h-screen w-full flex items-center justify-center bg-black text-white">
                <div className="text-center px-8">
                    <h2 className="text-5xl font-black mb-4">100+ Devices</h2>
                    <p className="text-xl">Har phone model ke liye perfect fit</p>
                </div>
            </section>

        </div>
    );
}