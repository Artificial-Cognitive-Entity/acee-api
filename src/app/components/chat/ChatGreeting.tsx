import { UseChatHelpers } from 'ai/react';
import Button from '../button';

const exampleMessages = [
  {
    heading: 'What issues are completed?',
    message: 'What issues are completed?',
  },
  {
    heading: 'Summarize the onboarding document.',
    message: 'Summarize the onboarding document.',
  },
  {
    heading: 'Is the survey for the Management Hub project done?',
    message: 'Is the survey for the Management Hub project done?',
  },
];

export function ChatGreeting({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mt-12 mx-auto max-w-2xl px-4 justify-self-center">
      <div className="rounded-lg border border-white bg-black shadow-lg p-8">
        <h1 className="mb-2 text-lg font-semibold text-white">
          Welcome to ACEE!
        </h1>
        <p className="mb-2 leading-normal text-white">
          ACEE is an AI chatbot built to help you find documents!
        </p>
        <p className="leading-normal text-white">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              className="h-auto p-3 text-base bg-purple-900 text-white hover:bg-purple-700"
              onClick={() => setInput(message.message)}
            >
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}