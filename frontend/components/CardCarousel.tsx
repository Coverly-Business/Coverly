"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const cards = [
    {
        title: "Coffee Series",
        desc: "3D textured design, matte finish",
        color: "bg-yellow-300 text-black",
        rotate: "-rotate-6",
    },
    {
        title: "Crystal Clear",
        desc: "Transparent TPU, ultra-slim fit",
        color: "bg-primary text-white",
        rotate: "rotate-0",
    },
    {
        title: "Shockproof Armor",
        desc: "Military-grade drop protection",
        color: "bg-black text-white",
        rotate: "rotate-6",
    },
];

export function CardCarousel() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic">
                        Our <span className="text-primary italic">Collections</span>
                    </h2>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={30}
                    slidesPerView={1.3}
                    centeredSlides={true}
                    className="w-full max-w-4xl mx-auto"
                >
                    {cards.map((card, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className={`${card.color} ${card.rotate} rounded-3xl p-10 h-80 flex flex-col justify-between shadow-xl transition-transform`}
                            >
                                <h3 className="text-3xl font-black uppercase italic">{card.title}</h3>
                                <p className="text-lg">{card.desc}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}