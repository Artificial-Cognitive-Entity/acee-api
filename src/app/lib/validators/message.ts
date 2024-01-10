import {boolean, z} from 'zod'

export const MessageSchema = z.object({

    id:z.string(),
    isUserInput: z.boolean(),
    text: z.string()

})

//array validator (contains a previous messages written, for chat history)
export const MessageArraySchema = z.array(MessageSchema)

export type Message = z.infer<typeof MessageSchema>