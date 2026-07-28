export default function ReturnRefundPage() {
    return (
        <div className="container mx-auto max-w-3xl py-16 px-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-2">
                Return & <span className="text-primary italic">Refund Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">1. Return Eligibility</h2>
                    <p>
                        We accept returns within 7 days of delivery, provided the product is unused, in its
                        original packaging, and in the same condition you received it.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">2. Non-Returnable Items</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Products damaged due to misuse or normal wear and tear</li>
                        <li>Products without original packaging or tags</li>
                        <li>Items marked as final sale or clearance</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">3. How to Initiate a Return</h2>
                    <p>
                        To start a return, contact us at{" "}
                        <a href="mailto:support@coverly.in" className="text-primary font-medium">
                            support@coverly.in
                        </a>{" "}
                        with your Order ID and reason for return. Our team will guide you through the
                        pickup or drop-off process.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">4. Refunds</h2>
                    <p>
                        Once we receive and inspect your returned item, we will notify you of the approval
                        status. Approved refunds are processed within 5-7 business days to your original
                        payment method. For Cash on Delivery orders, refunds are issued via bank transfer or
                        UPI.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">5. Exchanges</h2>
                    <p>
                        If you received a damaged or defective product, we offer a free replacement subject
                        to availability. Please share clear photos of the issue when contacting support to
                        speed up the process.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">6. Contact Us</h2>
                    <p>
                        For any return or refund queries, reach out to us at{" "}
                        <a href="mailto:support@coverly.in" className="text-primary font-medium">
                            support@coverly.in
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}