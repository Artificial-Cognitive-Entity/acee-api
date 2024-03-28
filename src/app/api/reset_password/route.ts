import bcrypt, { hash } from "bcrypt";
import { findToken, updateUserPassword } from "../database/singlestore";

const saltRounds = 10; // Recommended salt rounds for bcrypt

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json({ message: "Method Not Allowed" }, { status: 405 });
  }

  const body = await req.json();
  console.log(body);
  const url = new URL(body.url);
  const token = url.searchParams.get("token");

  if (!body.password || !token) {
    return Response.json(
      { error: "Password and token are required" },
      { status: 400 }
    );
  }

  try {
    const user = await findToken({ token: token });

    if (!user) {
      // No user found with the given verificationToken
      return Response.json(
        { error: "Invalid or expired verification token." },
        { status: 404 }
      );
    }

    // Step 2: Hash newPassword.
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    {
      const updateData = {
        password: hashedPassword, // The new hashed password
        token: token, // The token used for verification
      };

      await updateUserPassword(updateData);

      return Response.json(
        { message: "User password reset!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    return Response.json(
      { error: "An error occurred during the password reset process." },
      { status: 500 }
    );
  }
}
