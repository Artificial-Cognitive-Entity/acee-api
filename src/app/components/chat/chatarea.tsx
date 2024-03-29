import { cn } from "@/app/lib/utils";
import { useChat } from "ai/react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../button";
import { Message } from "ai";
import { PersonCircle } from "@styled-icons/bootstrap";
import { SetStateAction, useEffect, useRef, useState } from "react";
import TrashIcon from "@/app/components/chat/trash";
import { RobotImage } from "./RobotIcon";
import { ChatLoader } from "@/app/lib/loader";
import { ChatGreeting } from "./ChatGreeting";
import ChatBubble from "./ChatBubble";

export default function ChatArea() {
  const [time, setTime] = useState("");

  // get timestamp of message
  const getTimeStamp = () => {
    const hours_24 = new Date().getHours();
    const period = hours_24 >= 12 ? "PM" : "AM";
    const hours = hours_24 > 12 ? Math.abs(hours_24 - 12) : hours_24;

    const timestamp = `${hours}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${period}`;
    return timestamp;
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
    setInput,
  } = useChat(); // automatically makes a request to /api/chat

  const onEnterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e);
      getTimeStamp();
    }
  };

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
          {messages.length > 0 ? (
            <>
              {messages.map((message) => (
                <ChatMessage
                  message={message}
                  key={message.id}
                  time={getTimeStamp}
                />
              ))}

              {isLoading && lastMessageIsUser && (
                <ChatMessage
                  message={{
                    role: "assistant",
                    content: "COMING UP WITH A RESPONSE FOR THE USER",
                  }}
                  time={() => {
                    return "";
                  }}
                ></ChatMessage>
              )}

              {error && (
                <ChatMessage
                  message={{
                    role: "assistant",
                    content: "Something went wrong! Please try again.",
                  }}
                  time={getTimeStamp}
                ></ChatMessage>
              )}
            </>
          ) : (
            <ChatGreeting setInput={setInput}></ChatGreeting>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          onKeyDown={onEnterPress}
          className="w-full inline-flex items-center justify-center gap-7 mb-5"
          id="form"
        >
          <Button
            type="button"
            className="w-1/12 rounded-lg bg-purple-900 hover:bg-purple-700 text-white"
            onClick={() => setMessages([])}
          >
            <TrashIcon></TrashIcon>
          </Button>
          <TextareaAutosize
            className="w-9/12 resize-none rounded-lg text-black"
            maxRows={1}
            value={input}
            onChange={handleInputChange}
            placeholder="enter anything"
            autoFocus
            id="usermsg"
          ></TextareaAutosize>
          <Button
            type="submit"
            className="w-1/12 rounded-lg bg-purple-900 hover:bg-purple-700 text-white"
            onClick={getTimeStamp}
          >
            enter
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({
  message: { role, content },
  time,
}: {
  message: Pick<Message, "role" | "content">;
  time: () => string;
}) {
  const isAiMessage = role === "assistant";

  return (
    <>
      <div
        className={cn(
          "mb-3 flex items-center chat",
          isAiMessage
            ? "chat-start m-5 justify-start"
            : "chat-end justify-end m-5"
        )}
      >
        {isAiMessage && <RobotImage className="mr-2"></RobotImage>}

        {/* framer motion for animations? */}
        <div className="chat-header text-left max-w-12">
          {isAiMessage && (
            <>
              <div className="">
                <div>ACEE</div>{" "}
                <time className="text-xs opacity-50">{time()}</time>
              </div>
            </>
          )}
        </div>
        {isAiMessage && content == "COMING UP WITH A RESPONSE FOR THE USER" ? (
          <div className="chat-bubble chat-bubble-primary text-lg flex justify-center items-center rounded-lg">
            <ChatLoader></ChatLoader>
          </div>
        ) : (
          <>
            {isAiMessage &&
            content == "Something went wrong! Please try again." ? (
              <div className="chat-bubble chat-bubble-error text-primary-content text-lg text-left whitespace-normal ">
                {content}
              </div>
            ) : (
              <div className="prose chat-bubble chat-bubble-primary text-primary-content text-lg whitespace-normal rounded-lg">
                <ChatBubble content={content}></ChatBubble>
              </div>
            )}
          </>
        )}

        <div className="chat-header text-right">
          {!isAiMessage && (
            <>
              <div className="text-right max-w-12">
                <div>User</div>{" "}
                <time className="text-xs opacity-50">{time()}</time>
              </div>
            </>
          )}
        </div>
        {!isAiMessage && (
          <PersonCircle className="w-12 h-12 grow-0 shrink-0 basis-auto "></PersonCircle>
        )}
      </div>
    </>
  );
}
