import bcrypt, { hash } from 'bcrypt';
import { findToken, updateUserPasswordStatus } from "../database/singlestore";

const saltRounds = 10; // Recommended salt rounds for bcrypt

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return Response.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    const body = await req.json();
    //const userData = body.formData;
    console.log(body);

    if (!body.email || !body.password || !body.token) {
        //res.status(400).json({ error: 'Email is required' });
        return Response.json(
            {error: "Password and token are required"},
            {status: 400}
        );
    }

    try {

        // Step 1: Validate verificationToken and find the user.

        const user = await findToken({ token: body.token });


        if (!user) {
            // No user found with the given verificationToken
            return Response.json({ error: "Invalid or expired verification token." }, { status: 404 });
        }

        // Step 2: Hash newPassword.
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        console.log(hashedPassword);

        {

            const updateData = {
                password: hashedPassword, // The new hashed password
                status: 'active', // Assuming you want to set the user status to active
                token: body.token, // The token used for verification
            };

            await updateUserPasswordStatus(updateData);

            return Response.json({ message: "User password and status updated!" }, { status: 200 });
          }

        // Step 3: Update user's status to 'active' and set the new hashed password.

        // Step 4: Respond to the request.
        return Response.json({ message: "Your account has been verified and password updated successfully." }, { status: 200 });

    } catch (error) {
        console.error('Error verifying user and resetting password:', error);
        return Response.json({ error: "An error occurred during the verification process." }, { status: 500 });
    }
}
