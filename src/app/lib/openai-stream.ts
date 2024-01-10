export type ChatGPTAgent = "user" | "system"


export interface ChatGPTMessage {
    role: ChatGPTAgent
    content: string
}