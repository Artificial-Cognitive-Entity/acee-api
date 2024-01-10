import { ChatGPTMessage } from "@/app/lib/openai-stream"
import { MessageArraySchema } from "@/app/lib/validators/message"

export async function POST(req: Request)
{
    const {messages} = await req.json()

    // valid user input against schema
    const parsedMessages = MessageArraySchema.parse(messages)

    // messages to send to OpenAI
    const outboundMessages: ChatGPTMessage [] = parsedMessages.map((message) => ({
        role: message.isUserInput ? 'user' : 'system',
        content: message.text
    }))

    //to reverse messages on the frontend
    // unshift inserts at the first slot of the array
    outboundMessages.unshift(
        {
            role: 'system',
            content: ""
        }
    )
}