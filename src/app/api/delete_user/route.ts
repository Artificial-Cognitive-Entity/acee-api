import { getServerSession } from "next-auth";
import { deleteUser } from "../database/singlestore";
import { options } from "../auth/[...nextauth]/options";


export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const user_id = body.user_id;

    const session = await getServerSession(options)
    const admin_group: string = session!.user.group

    await deleteUser({user_id, admin_group})

    return Response.json({ message: "User successfully deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
