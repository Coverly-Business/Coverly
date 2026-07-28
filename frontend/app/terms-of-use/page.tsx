export default function TermsOfUsePage() {
    return (
        <div className="container mx-auto max-w-3xl py-16 px-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-2">
                Terms of <span className="text-primary italic">Use</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using Coverly's website, you agree to be bound by these Terms of
                        Use. If you do not agree with any part of these terms, please do not use our Site.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">2. Products & Pricing</h2>
                    <p>
                        All product descriptions, images, and prices are subject to change without notice.
                        We make every effort to display our products accurately, but colors and finishes may
                        vary slightly depending on your device screen.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">3. Orders & Payment</h2>
                    <p>
                        By placing an order, you confirm that the shipping and payment information provided
                        is accurate. We currently accept Cash on Delivery (COD) and other listed payment
                        methods. We reserve the right to cancel or refuse any order at our discretion.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">4. Shipping & Delivery</h2>
                    <p>
                        Estimated delivery times are provided at checkout and on the order tracking page.
                        Delays may occur due to factors outside our control, including courier delays or
                        unforeseen circumstances.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">5. Returns & Refunds</h2>
                    <p>
                        We offer a 7-day return window for eligible products in original, unused condition.
                        Please refer to our Return & Refund Policy for full details.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">6. Account Responsibility</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account credentials
                        and for all activities that occur under your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">7. Intellectual Property</h2>
                    <p>
                        All content on this Site, including logos, designs, and product images, is the
                        property of Coverly and may not be reproduced without permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">8. Limitation of Liability</h2>
                    <p>
                        Coverly is not liable for any indirect, incidental, or consequential damages arising
                        from the use of our products or Site.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">9. Contact Us</h2>
                    <p>
                        For any questions regarding these Terms, please contact us at{" "}
                        <a href="mailto:support@coverly.in" className="text-primary font-medium">
                            support@coverly.in
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}