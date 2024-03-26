import { NextResponse } from "next/server";
import { addUser, findEmail, getGroupMembers } from "../database/singlestore";

export async function GET(req: Request) {
  try {
    // TODO: GET LOGGED IN USER'S CREDS

    const body = await req.json()
    const admin_id = body.admin_id
    
    const group = await getGroupMembers({ admin_id });
    console.log(group);

    return Response.json(group, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
