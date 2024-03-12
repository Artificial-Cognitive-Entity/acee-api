import { ChatCompletionMessage } from "openai/resources/index.mjs";
import openai from "@/app/lib/models/openai";
import { findRelevantDocs } from "@/app/api/database/singlestore";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { geckoEmbedding } from "@/app/lib/models/vertexai";

function removeIDs(doc: any) {
  for (let i = 0; i < doc.length; i++) {
    delete doc[i].parent_id;
    delete doc[i].children_ids;

    for (let j = 0; j < doc[i].children.length; j++) {
      delete doc[i].children[j].child_id;
    }
  }

  return doc;
}
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
    let relevantDocs: any = await findRelevantDocs({ embedding });

    relevantDocs = removeIDs(relevantDocs);

    let systemMessage: ChatCompletionMessage;

    let parsed_docs = JSON.stringify(relevantDocs, null, 3).replace(
      /[\[\]{}]/g,
      ""
    );
    console.log(parsed_docs);

    if (relevantDocs) {
      systemMessage = {
        role: "assistant",
        content: `You are an AI assistant named ACEE (Artificial Cognitive Entity for Enterprise). Your task is to aid employees in finding relevant documentation pertaining to the company. 
        You are able to answer the user's questions based on documents in the database. Do not use any sources other than the relevant documents provided.
        The relevant documents found in the database for this query are:
        
        ${parsed_docs}
      
        The time in the last updated field is in 24 hour time. Convert it to the AM/PM format. Do not include the seconds.
        Do not display links in the [linkTitle](linkUrl) format. Display the url in plaintext.

        `,
      };
    } else {
      systemMessage = {
        role: "assistant",
        content: `You are an AI assistant named ACEE (Artificial Cognitive Entity for Enterprise) built to aid employees in finding relevant documentation pertaining to the company.
        You are able to answer the user's questions based on documents in the database.
        Do not use any sources other than the relevant documents provided. 
        Unfortunately, there are no relevant documents available, so let the user know that you are unable to help them at this moment.`,
      };
    }

    console.log(systemMessage);
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
