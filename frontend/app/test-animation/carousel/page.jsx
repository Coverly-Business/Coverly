"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const cards = [
    {
        title: "Coffee Series",
        desc: "3D textured design, matte finish",
        color: "bg-yellow-300",
        rotate: "-rotate-6",
    },
    {
        title: "Crystal Clear",
        desc: "Transparent TPU, ultra-slim fit",
        color: "bg-purple-400",
        rotate: "rotate-0",
    },
    {
        title: "Shockproof Armor",
        desc: "Military-grade drop protection",
        color: "bg-black text-white",
        rotate: "rotate-6",
    },
];

export default function CarouselTest() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-10 py-20">

            <h2 className="text-4xl font-black">Our Collections</h2>

            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={30}
                slidesPerView={1.3}
                centeredSlides={true}
                className="w-full max-w-4xl"
            >
                {cards.map((card, i) => (
                    <SwiperSlide key={i}>
                        <div
                            className={`${card.color} ${card.rotate} rounded-2xl p-10 h-80 flex flex-col justify-between shadow-xl transition-transform`}
                        >
                            <h3 className="text-3xl font-bold">{card.title}</h3>
                            <p className="text-lg">{card.desc}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}