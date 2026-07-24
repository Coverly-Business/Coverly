import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    family: 4,
} as SMTPTransport.Options);

interface OrderEmailData {
    to: string;
    customerName: string;
    orderId: string;
    items: { name: string; quantity: number; price: number }[];
    totalAmount: number;
    paymentMethod: string;
}

export const sendOrderConfirmationEmail = async (data: OrderEmailData) => {
    const itemsHtml = data.items
        .map(
            (item) =>
                `<tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${item.name} × ${item.quantity}</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
                </tr>`
        )
        .join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #4F46E5;">Order Confirmed!</h1>
            <p>Hi ${data.customerName},</p>
            <p>Thank you for shopping with Coverly. Your order has been placed successfully.</p>

            <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 12px; color: #666;">ORDER ID</p>
                <p style="margin: 4px 0 0; font-weight: bold; font-family: monospace;">${data.orderId}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                ${itemsHtml}
                <tr>
                    <td style="padding: 12px 0; font-weight: bold;">Total</td>
                    <td style="padding: 12px 0; font-weight: bold; text-align: right;">₹${data.totalAmount}</td>
                </tr>
            </table>

            <p style="font-size: 14px; color: #666;">Payment Method: <strong>${data.paymentMethod}</strong></p>
            <p style="font-size: 14px; color: #666;">Estimated Delivery: 3-5 business days</p>

            <p style="margin-top: 30px; font-size: 12px; color: #999;">
                Thanks for choosing Coverly — premium mobile covers, designed in India.
            </p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Coverly" <${process.env.EMAIL_USER}>`,
            to: data.to,
            subject: `Order Confirmed — #${data.orderId.slice(-8).toUpperCase()}`,
            html,
        });
        console.log('Order confirmation email sent to:', data.to);
    } catch (err) {
        console.error('Failed to send email:', err);
        // Email fail hone pe order creation ko block nahi karna — bas log karo
    }
};