export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto max-w-3xl py-16 px-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-2">
                Privacy <span className="text-primary italic">Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">1. Introduction</h2>
                    <p>
                        Coverly ("we," "our," "us") operates coverly-nine.vercel.app (the "Site"). This
                        Privacy Policy explains how we collect, use, and protect your personal information
                        when you use our website and services.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">2. Information We Collect</h2>
                    <p>We collect the following information when you use our Site:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Name, email address, and phone number (when you create an account or place an order)</li>
                        <li>Shipping address and billing details</li>
                        <li>Order history and preferences</li>
                        <li>Profile photo, if you choose to upload one</li>
                        <li>If you sign in with Google, we receive your name and email from Google</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">3. How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>To process and deliver your orders</li>
                        <li>To send order confirmations and shipping updates</li>
                        <li>To provide customer support</li>
                        <li>To improve our products and services</li>
                        <li>To send promotional emails, only if you have opted in</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">4. Data Storage & Security</h2>
                    <p>
                        Your data is stored securely using industry-standard practices, including encrypted
                        passwords. We do not sell your personal information to third parties. Order and
                        payment processing may involve trusted third-party services (such as payment
                        gateways and cloud storage providers) solely for the purpose of fulfilling your order.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">5. Cookies</h2>
                    <p>
                        We use cookies and local storage to keep you logged in and to remember items in your
                        shopping cart. You can disable cookies in your browser settings, though this may
                        affect site functionality.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">6. Your Rights</h2>
                    <p>
                        You may access, update, or delete your account information at any time from your
                        account settings. To request complete deletion of your data, please contact us
                        using the details below.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-foreground mb-2">7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:support@coverly.in" className="text-primary font-medium">
                            support@coverly.in
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}