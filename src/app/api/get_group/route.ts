import {getGroupMembers } from "../database/singlestore";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import type { GroupMember } from "../database/singlestore";

export async function GET() {
  try {

    const session = await getServerSession(options)
    const admin_group: string = session!.user.group
    const admin_id: string = session!.user.id

    const group = await getGroupMembers({ admin_group, admin_id });
    
    if(!group)
    {
      return Response.json({ message: "No members in your group!" }, { status: 404 });
    }

    return Response.json(group, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
