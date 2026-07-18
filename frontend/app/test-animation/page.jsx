"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".fade-text", {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: ".fade-text",
                start: "top 80%",
            },
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ height: "200vh", padding: "50px" }}>
            <div style={{ height: "100vh" }}></div> {/* ye spacer add kiya */}
            <h1 className="fade-text">Test Page</h1>
            <p>Yahan animations test karenge</p>
        </div>
    );
}