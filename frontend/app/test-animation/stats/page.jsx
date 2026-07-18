"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsTest() {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Har counter ke liye alag-alag animation
        const counters = gsap.utils.toArray(".counter-number");

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
        <div ref={containerRef} className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-16 py-20">

            {/* Stat 1 */}
            <div className="text-center">
                <p
                    className="counter-number text-7xl font-black text-yellow-400"
                    data-target="95"
                    data-suffix="%"
                >
                    0%
                </p>
                <p className="text-lg text-gray-300 mt-2">Customers loved our cases</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
                <p
                    className="counter-number text-7xl font-black text-purple-400"
                    data-target="10000"
                    data-suffix="+"
                >
                    0+
                </p>
                <p className="text-lg text-gray-300 mt-2">Cases sold across India</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
                <p
                    className="counter-number text-7xl font-black text-green-400"
                    data-target="24"
                >
                    0
                </p>
                <p className="text-lg text-gray-300 mt-2">Hour dispatch time</p>
            </div>

        </div>
    );
}