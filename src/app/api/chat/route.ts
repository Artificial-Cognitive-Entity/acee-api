import { ChatCompletionMessage } from "openai/resources/index.mjs";
import openai from "@/app/lib/models/openai";
import { findRelevantDocs } from "@/app/api/database/singlestore";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { geckoEmbedding } from "@/app/lib/models/vertexai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const messages: ChatCompletionMessage[] = body.messages;

    // get last 6 messages (user and ai) for context
    const messagesTruncated = messages.slice(-6);

    const embedding = await geckoEmbedding(
      messagesTruncated.map((message) => message.content).join("\n")
    );

    // NEED TO GET USER'S ID FOR SPECIFIC CONVO HISTORY
    const relevantDocs: any = await findRelevantDocs({ embedding });
    let systemMessage: ChatCompletionMessage;

    if (relevantDocs) {
      systemMessage = {
        role: "assistant",
        content: `You are an AI assistant built to aid employees in finding relevant documentation pertaining to the company. 
        You are able to answer the user's questions based on documents in the database. Do not use any sources other than the relevant documents provided.
        The relevant documents found in the database for this query are:\n\n
        
        Title: ${relevantDocs.node_title}
        Type: ${relevantDocs.node_type}
        Url: ${relevantDocs.url}
        Content: ${relevantDocs.content}
        Content Type: ${relevantDocs.content_type}
        Data Source: ${relevantDocs.data_source}
        Last Updated: ${relevantDocs.last_updated}        

        The time in the last updated field is in 24 hour time. Convert it to the AM/PM format. Do not include the seconds.
        `,
      };
    } else {
      systemMessage = {
        role: "assistant",
        content: `You are an AI assistant built to aid employees in finding relevant documentation pertaining to the company.
        You are able to answer the user's questions based on documents in the database.
        Do not use any sources other than the relevant documents provided. 
        Unfortunately, there are no relevant documents available, so let the user know that you are unable to help them at this moment.`,
      };
    }

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
