import bcrypt, { hash } from 'bcrypt';
import { findToken, updateUserPassword } from "../database/singlestore";
// Assume connectToSinglestore is imported or defined elsewhere in your project
// import { connectToSinglestore } from './your-db-connection-file';
import { redirect } from "next/navigation";
import { useRouter } from 'next/router';
const router = useRouter();

const saltRounds = 10; // Recommended salt rounds for bcrypt

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return Response.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    const body = await req.json();

    // Correct way to extract the token from the query string
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    // Get the token parameter from the URL
    //const token = params.get('token');
    console.log(token);

    //const userData = body.formData;
    console.log(body);

    if (!body.email || !body.password || !token) {
        //res.status(400).json({ error: 'Email is required' });
        return Response.json(
            { error: "Password and token are required" },
            { status: 400 }
        );
    }


    try {

        const user = await findToken({ token: token });

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
                token: token, // The token used for verification
            };

            await updateUserPassword(updateData);


            //FIX THE REROUTE
            //router.push('/login');
            //redirect('/login');
            return Response.json({ message: "User password reset!" }, { status: 200 });
            // After your logic and right before sending a response:
            


        }

        // Step 3: Set the new hashed password.

        // Step 4: Respond to the request.
        return Response.json({ message: "Your password updated successfully." }, { status: 200 });

    } catch (error) {
        console.error('Error resetting password:', error);
        return Response.json({ error: "An error occurred during the password reset process." }, { status: 500 });
    }
}