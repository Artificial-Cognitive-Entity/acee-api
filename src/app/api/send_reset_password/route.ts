// Include necessary imports
import nodemailer from 'nodemailer';
import crypto from 'crypto';
require('dotenv').config();

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return Response.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    const body = await req.json();
    console.log(body);

    if (!body.email || !body.token) {
        return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a password reset token
    //const resetToken = crypto.randomBytes(20).toString('hex');
    // Here, you would update the user's record with the resetToken and the token's expiry time

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: false,
        auth: {
           user: process.env.EMAIL_USERNAME,
           pass: process.env.EMAIL_PASSWORD,
        },
        debug: false,
        logger: true
    });


    //PROECT THE TOKEN AND HASH THE PASSWORD
    const resetLink = `${process.env.ACEE_URL}/password_reset?token=${body.token}`;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: body.email,
            subject: 'Reset Your Password',
            html: `To reset your password, please click on the following link or paste it into your browser: <a href="${resetLink}">${resetLink}</a>`,
        });

        return Response.json({ message: "Password reset email sent successfully." }, { status: 200 });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return Response.json({ error: "An error occurred while sending the password reset email." }, { status: 500 });
    }
}
