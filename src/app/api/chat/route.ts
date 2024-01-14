import { ChatCompletionMessage } from "openai/resources/index.mjs";
import openai, { getEmbedding } from "@/app/lib/openai";
import { findRelevantDocs } from "@/app/api/database/singlestore";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const messages: ChatCompletionMessage[] = body.messages;

    // get last 6 messages (user and ai) for context
    const messagesTruncated = messages.slice(-6);

    const embedding = await getEmbedding(
      messagesTruncated.map((message) => message.content).join("\n")
    );

    // NEED TO GET USER'S ID FOR SPECIFIC CONVO HISTORY
    const relevantDocs: any = await findRelevantDocs({ embedding });

    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
        "You are an AI assisant built to aid employees in finding relevant documentation pertaining to the company. You are able to answer the user's questions based on documents in the database. Do not use any sources other than the relevant documents provided." +
        "The relevant documents found in the database for this query are:\n" +
        relevantDocs
          .map(
            (doc: { text: string; title: string }) =>
              `Title: ${doc.title}\n\nContent:\n${doc.text}`
          )
          .join(),
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
