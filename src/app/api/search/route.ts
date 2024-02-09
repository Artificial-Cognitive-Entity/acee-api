import { searchDatabase } from "../database/singlestore";

export async function POST(req: Request) {
  const body = await req.json();
  const input = body.searchTerm;

  if (!input) {
    return Response.json({ error: "Empty input" });
  }

  const result = await searchDatabase({ input });

  return Response.json({ result });
}
