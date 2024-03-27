import { updateUser } from "../database/singlestore";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!(await updateUser(body))) {
      return Response.json({ message: "Bad request" }, { status: 400 });
    }
    return Response.json({ message: "successful !" }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
