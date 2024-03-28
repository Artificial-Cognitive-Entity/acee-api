import nodemailer from 'nodemailer';
import crypto from 'crypto';
require('dotenv').config();

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return Response.json(
            {message: "Method Not Allowed"},
            {status: 405}
        );
    }

    const body = await req.json();
    console.log(body);

    if (!body.email || !body.token) {
        return Response.json(
            {error: "Email is required"},
            {status: 400}
        );
    }

    //const verificationToken = crypto.randomBytes(20).toString('hex');
    // Assuming updateUserVerificationToken updates the user's record with the verification token
    // This part of the logic is omitted for brevity

    console.log(process.env.EMAIL_USERNAME);
    console.log(process.env.EMAIL_PASSWORD);

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

    //when a user is created, create a jwt token as a user variable, use it at the end of the url,
    //then the url takes the token and compares it in the database to find what users password to update

    //TODO: hash token?
    const verificationLink = `http://localhost:3000/verify_email/${body.token}`;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: body.email,
            subject: 'Verify Your Email',
            html: `Please click on the following link, or paste this into your browser to complete the process: <a href="${verificationLink}">${verificationLink}</a>`,
        });

        //res.status(200).json({ message: 'Verification email sent successfully.' });
        return Response.json(
            { message: "Verification email sent successfully." },
            { status: 200 }
          )
    } catch (error) {
        console.error('Error sending verification email:', error);
        //res.status(500).json({ error: 'An error occurred while sending the verification email.' });
        return Response.json(
            { error: "An error occurred while sending the verification email." },
            { status: 500 }
          )
    }
}