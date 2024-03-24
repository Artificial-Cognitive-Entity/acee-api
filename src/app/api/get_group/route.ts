export async function GET(req: Request) {
  try {
//    get logged in user
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
