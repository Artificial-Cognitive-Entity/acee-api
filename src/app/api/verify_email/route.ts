import bcrypt from 'bcrypt';
import { connectSingleStore } from "../database/singlestore";
// Assume connectToSinglestore is imported or defined elsewhere in your project
// import { connectToSinglestore } from './your-db-connection-file';

const saltRounds = 10; // Recommended salt rounds for bcrypt

export async function verifyAndReset(req: Request) {
    if (req.method !== 'POST') {
        return Response.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    const body = await req.json();
    console.log(body);

    if (!body.password || !body.token) {
        //res.status(400).json({ error: 'Email is required' });
        return Response.json(
            {error: "Password and Token are required"},
            {status: 400}
        );
    }

    try {
        const db = await connectSingleStore(); // Connect to your database

        // Step 1: Validate verificationToken and find the user.
        // Replace 'your_user_table' with your actual user table name
        const findUserQuery = `SELECT * FROM users WHERE token = ? LIMIT 1`;
        const user = await db.query(findUserQuery, [body.token]);

        if (user == null) {
            // No user found with the given verificationToken
            return Response.json({ error: "Invalid or expired verification token." }, { status: 404 });
        }

        // Step 2: Hash newPassword.
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        // Step 3: Update user's status to 'active' and set the new hashed password.
        const updateUserQuery = `UPDATE your_user_table SET password = ?, status = 'active' WHERE verificationToken = ?`;
        await db.query(updateUserQuery, [hashedPassword, body.token]);

        // Close the database connection if needed
        // await db.close();

        // Step 4: Respond to the request.
        return Response.json({ message: "Your account has been verified and password updated successfully." }, { status: 200 });

    } catch (error) {
        console.error('Error verifying user and resetting password:', error);
        return Response.json({ error: "An error occurred during the verification process." }, { status: 500 });
    }
}

