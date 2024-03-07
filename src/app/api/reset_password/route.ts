import bcrypt from 'bcrypt';
import { connectSingleStore } from "../database/singlestore";
// Assume connectToSinglestore is imported or defined elsewhere in your project
// import { connectToSinglestore } from './your-db-connection-file';

const saltRounds = 10; // Recommended salt rounds for bcrypt

export async function passwordResetVerification(req: Request) {
    if (req.method !== 'POST') {
        return Response.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    const { resetToken, newPassword } = await req.json();

    try {
        const db = await connectSingleStore(); // Connect to your database

        // Step 1: Validate resetToken and find the user.
        // Replace 'your_user_table' with your actual user table name
        const findUserQuery = `SELECT * FROM your_user_table WHERE resetToken = ? LIMIT 1`;
        const user = await db.query(findUserQuery, [resetToken]);

        if (user == null) {
            // No user found with the given resetToken
            return Response.json({ error: "Invalid or expired reset token." }, { status: 404 });
        }

        // Step 2: Hash newPassword.
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Step 3: Update user's password and possibly clear the resetToken.
        const updateUserQuery = `UPDATE your_user_table SET password = ?, resetToken = NULL WHERE resetToken = ?`;
        await db.query(updateUserQuery, [hashedPassword, resetToken]);

        // Close the database connection if needed
        // await db.close();

        // Step 4: Respond to the request.
        return Response.json({ message: "Password has been reset successfully." }, { status: 200 });

    } catch (error) {
        console.error('Error during password reset verification:', error);
        return Response.json({ error: "An error occurred during the password reset process." }, { status: 500 });
    }
}

