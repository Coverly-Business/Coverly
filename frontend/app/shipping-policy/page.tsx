export default function ShippingPolicyPage() {
    return (
        <div className="container mx-auto max-w-3xl py-16 px-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-2">
                Shipping <span className="text-primary italic">Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">1. Processing Time</h2>
                    <p>
                        All orders are processed within 24-48 hours of confirmation, excluding weekends and
                        public holidays. You will receive an email once your order has been dispatched.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">2. Delivery Timelines</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Metro cities: 2-4 business days</li>
                        <li>Other cities & towns: 4-7 business days</li>
                        <li>Remote areas: 7-10 business days</li>
                    </ul>
                    <p className="mt-2">
                        These are estimated timelines and may vary due to courier delays, weather, or
                        regional restrictions.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">3. Shipping Charges</h2>
                    <p>
                        We currently offer free shipping on all orders across India. Any applicable charges,
                        if introduced in the future, will be clearly displayed at checkout before payment.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">4. Order Tracking</h2>
                    <p>
                        Once your order is shipped, you can track its status anytime using the{" "}
                        <a href="/track-order" className="text-primary font-medium">Track Order</a> page with
                        your Order ID.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">5. Failed Delivery Attempts</h2>
                    <p>
                        If a delivery attempt is unsuccessful due to an incorrect address or unavailability,
                        our courier partner will attempt redelivery. Orders undelivered after multiple
                        attempts may be returned to us, and we will contact you to arrange redelivery or
                        refund as applicable.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">6. Contact Us</h2>
                    <p>
                        For any shipping-related queries, reach out to us at{" "}
                        <a href="mailto:support@coverly.in" className="text-primary font-medium">
                            support@coverly.in
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}