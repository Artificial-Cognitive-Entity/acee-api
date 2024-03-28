import { NextResponse } from "next/server";
import { addUser, findEmail } from "../database/singlestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userData = body.formData;
    const admin = body.admin;

    if (
      !userData.email ||
      !userData.fName ||
      !userData.lName ||
      !userData.role
    ) {
      return Response.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    //check for duplicate emails
    const isFound: [] = await findEmail(userData);

    //undefined
    if (!isFound) {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    } else {
      console.log(isFound);
      // no users with that email address was found
      if (isFound.length == 0) {
        const token: string | unknown = await addUser(userData, admin);

        if (typeof token == "string") {
          const email = userData.email;
          const emailRes = await fetch(
            "http://localhost:3000/api/send_verify_email",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, token }),
            }
          );

          const result = await emailRes.json();
          if (result.status != 200) {
            return Response.json({ message: "User created!" }, { status: 200 });
          }
          return Response.json(
            { erorr: "Sorry, we could not create the user at this time" },
            { status: 500 }
          );
        }

        
      }

      return Response.json(
        { message: "Sorry! A user with that email address already exists." },
        { status: 409 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
