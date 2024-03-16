import useSWR, { mutate } from "swr";
import { User } from "@/app/lib/schemas/user";
import { connectSingleStore } from "../database/singlestore";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    console.log("PUT REQUEST");

    const insertRoles = {
      roles: [body.role],
    };

    const query = `UPDATE users SET first_name = ${
      body.first_name
    }, last_name = ${body.last_name}, status = ${
      body.status
    }, role = ${JSON.stringify(insertRoles)} WHERE user_id = ${body.user_id}`;

    return Response.json({ message: "successful !" }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
