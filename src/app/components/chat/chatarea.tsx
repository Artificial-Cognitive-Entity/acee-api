"use client";
import { cn } from "@/app/lib/utils";
import { useChat } from "ai/react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../button";
import { Message } from "ai";
import { Robot, PersonCircle } from "@styled-icons/bootstrap";
import { useEffect, useRef } from "react";
import TrashIcon from "@/app/components/chat/trash";
import { RobotImage } from "./RobotIcon";

export default function ChatArea() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat(); // automatically makes a request to /api/chat

  // scroll while input is generated
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div className={cn("h-screen w-full overscroll-none")}>
      <div className="flex flex-col rounded shadow-xl h-full">
        <div className="h-full mt-3 mb-3 px-3 overflow-y-auto" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}

          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Thinking..",
              }}
            ></ChatMessage>
          )}

          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong! Please try again.",
              }}
            ></ChatMessage>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full inline-flex items-center justify-around mb-5"
          id="form"
        >
          <Button
            type="button"
            className="w-1/12"
            onClick={() => setMessages([])}
          >
            <TrashIcon></TrashIcon>
          </Button>
          <TextareaAutosize
            className="w-9/12 resize-none rounded-lg text-black"
            maxRows={4}
            value={input}
            onChange={handleInputChange}
            placeholder="enter anything"
            autoFocus
            id="usermsg"
          ></TextareaAutosize>
          <Button type="submit" className="w-1/12">
            enter
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {
  const isAiMessage = role === "assistant";
  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "m-5 justify-start" : "justify-end ms-5"
      )}
    >
      {isAiMessage && <RobotImage className="mr-2"></RobotImage>}
      <p
        className={cn(
          "whitespace-pre-line rounded-xl border-2 px-3 py-2",
          isAiMessage ? "bg-gray-600 text-white " : "bg-blue-800 text-white"
        )}
      >
        {content}
      </p>
      {!isAiMessage && (
        <PersonCircle className="ml-2 w-12 h-12 grow-0 shrink-0 basis-auto "></PersonCircle>
      )}
    </div>
  );
}
