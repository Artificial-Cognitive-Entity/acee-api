import { UseChatHelpers } from 'ai/react'

import Button from '../button'
import { ExternalLink } from '../ExternalLink'
// import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'What issues are completed?',
    message: `What issues are completed?`
  },
  {
    heading: 'Summarize the onboarding document.',
    message: 'Summarize the onboarding document.'
  },
  {
    heading: 'Is the survey for the Management Hub project done?',
    message: `Is the survey for the Management Hub project done?`
  }
]

export function ChatGreeting({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mt-12 mx-auto max-w-2xl px-4 justify-self-center">
      <div className="rounded-lg border bg-background shadow-lg p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to ACEE!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          ACEE is an AI chatbot built to help you find documents!
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              // variant="link"
              className="h-auto p-3 text-base"
              onClick={() => setInput(message.message)}
            >
              {/* <IconArrowRight className="mr-2 text-muted-foreground" /> */}
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}



// import React from "react";
// import ChatIcon from "./ChatIcon";

// // chat greeting
// const ChatGreeting = () => {
//   return (
//     <div className="w-full h-full gap-6 inline-flex flex-col items-center justify-center">
//       <ChatIcon></ChatIcon>
//       <div className="text-3xl">Chat with ACEE</div>
//     </div>
//   );
// };

// export default ChatGreeting;
