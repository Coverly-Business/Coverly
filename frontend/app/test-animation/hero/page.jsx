"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroTest() {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Sab badges ko halka sa upar-neeche float karwao, hamesha
        gsap.to(".badge", {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2, // har badge thoda alag time pe move karega
        });

        // Page load hote hi badges scale-in ho ke aayenge
        gsap.from(".badge", {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                height: "100vh",
                background: "#fafafa",
                overflow: "hidden",
            }}
        >
            {/* Center heading */}
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "60px",
                    fontWeight: "900",
                    paddingTop: "180px",
                }}
            >
                PROTECT YOUR <br /> DIGITAL VIBE
            </h1>

            {/* Badge 1 */}
            <div
                className="badge"
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    background: "#fde047",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    transform: "rotate(-8deg)",
                }}
            >
                🔥 Selling Fast
            </div>

            {/* Badge 2 */}
            <div
                className="badge"
                style={{
                    position: "absolute",
                    top: "60%",
                    right: "15%",
                    background: "#a855f7",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    transform: "rotate(6deg)",
                }}
            >
                📦 Free Shipping!
            </div>

            {/* Badge 3 */}
            <div
                className="badge"
                style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "20%",
                    background: "#1e293b",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    transform: "rotate(4deg)",
                }}
            >
                ⭐ 10k+ Happy Customers
            </div>
        </div>
    );
}