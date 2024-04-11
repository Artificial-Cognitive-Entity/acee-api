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


    let relevantDocs: any = await findRelevantDocs({ embedding });

    let systemMessage: ChatCompletionMessage;

    if (relevantDocs) {
      let parsed_docs = JSON.stringify(relevantDocs, null, 3).replace(
        /[\[\]{}]/g,
        ""
      );
      systemMessage = {
        role: "assistant",
        content: `You are an AI assistant named ACEE (Artificial Cognitive Entity for Enterprise). Your task is to aid employees in finding relevant information pertaining to the company documentation and applications. 
        Answer the user's questions based on documents in the database. Do not use any sources other than the relevant documents provided.
        The relevant documents found in the database for this query are:
        
        ${parsed_docs}
      
        Score indicates how relevant a document is to the user's query. The closer the score is to 1, the more relevant it is.
        The time in the last updated field is in 24 hour time. Convert it to the AM/PM format. Do not include the seconds.
        Do not display links in the [linkTitle](linkUrl) format. Display the url in plaintext.

        Other Requirements:
        - Do not bold anything
        - Do not add * or other special charaters
        - Make use of new line characters and for formatting

        Desired Output:
        - Try not to refer to the data structure you are recieving, speak in a conversational, natural language tone
        - If there is a link provided, give the link to the user
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

    // console.log(systemMessage);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated]
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
