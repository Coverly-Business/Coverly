"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How long does delivery take?",
        answer:
            "Delivery typically takes 2-4 business days for metro cities and 4-7 business days for other locations across India.",
    },
    {
        question: "Do you offer Cash on Delivery (COD)?",
        answer:
            "Yes, COD is available on all orders. You can also pay via UPI or Card at checkout.",
    },
    {
        question: "How can I track my order?",
        answer:
            "You can track your order anytime from the Track Order page using your Order ID, which is sent to your email after checkout.",
    },
    {
        question: "What is your return policy?",
        answer:
            "We accept returns within 7 days of delivery for unused products in original packaging. See our Return & Refund Policy for full details.",
    },
    {
        question: "Will the case fit my exact phone model?",
        answer:
            "Yes, all our cases are precisely designed for specific phone models. Please select your exact model on the product page before ordering to ensure a perfect fit.",
    },
    {
        question: "How do I create an account?",
        answer:
            "You can sign up using your email and password, or use the 'Sign in with Google' option for faster access.",
    },
    {
        question: "Can I change or cancel my order after placing it?",
        answer:
            "Please contact us as soon as possible at support@coverly.in. We can accommodate changes or cancellations only if the order hasn't been shipped yet.",
    },
];

export default function FAQsPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="container mx-auto max-w-3xl py-16 px-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-2">
                Frequently Asked <span className="text-primary italic">Questions</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-10">
                Can&apos;t find what you&apos;re looking for? Email us at{" "}
                <a href="mailto:support@coverly.in" className="text-primary font-medium">
                    support@coverly.in
                </a>
            </p>

            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div key={i} className="border rounded-2xl overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm"
                        >
                            {faq.question}
                            <ChevronDown
                                className={`h-4 w-4 transition-transform shrink-0 ml-4 ${openIndex === i ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openIndex === i && (
                            <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}