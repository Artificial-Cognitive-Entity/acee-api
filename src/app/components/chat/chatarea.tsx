"use client";
import { cn } from "@/app/lib/utils";
import { useChat } from "ai/react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../button";
import { Message } from "ai";
import { PersonCircle } from "@styled-icons/bootstrap";
import { useEffect, useRef, useState } from "react";
import TrashIcon from "@/app/components/chat/trash";
import { RobotImage } from "./RobotIcon";
import { ChatLoader } from "@/app/lib/loader";
import { Transition } from "@headlessui/react";

export default function ChatArea() {
  const [time, setTime] = useState("");
  const getTimeStamp = () => {
    const hours_24 = new Date().getHours();
    const period = hours_24 >= 12 ? "PM" : "AM";

    const hours = hours_24 - 12;
    const timestamp = `${hours}:${new Date().getMinutes()} ${period}`;
    setTime(timestamp);
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
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
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} time={time} />
          ))}

          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "COMING UP WITH A RESPONSE FOR THE USER",
              }}
              time={""}
            ></ChatMessage>
          )}

          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong! Please try again.",
              }}
              time={time}
            ></ChatMessage>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={onEnterPress}
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
            maxRows={1}
            value={input}
            onChange={handleInputChange}
            placeholder="enter anything"
            autoFocus
            id="usermsg"
          ></TextareaAutosize>
          <Button type="submit" className="w-1/12" onClick={getTimeStamp}>
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
  time: string;
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

        <div className="chat-header">
          {isAiMessage && (
            <>
              <div className="">
                <div>ACEE</div>{" "}
                <time className="text-xs opacity-50">{time}</time>
              </div>
            </>
          )}
        </div>
        {isAiMessage && content == "COMING UP WITH A RESPONSE FOR THE USER" ? (
          <Transition
            appear={true}
            show={true}
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="chat-bubble chat-bubble-primary text-lg flex justify-center items-center">
              <ChatLoader></ChatLoader>
            </div>
          </Transition>
        ) : (
          <Transition
            appear={true}
            show={true}
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {isAiMessage &&
            content == "Something went wrong! Please try again." ? (
              <div className="chat-bubble chat-bubble-error text-primary-content text-lg text-left">
                {content}
              </div>
            ) : (
              <div className="chat-bubble chat-bubble-primary text-primary-content text-lg">
                {content}
              </div>
            )}
          </Transition>
        )}

        <div className="chat-header">
          {!isAiMessage && (
            <>
              <div>User</div> <time className="text-xs opacity-50">{time}</time>
            </>
          )}
        </div>
        {!isAiMessage && (
          <PersonCircle className="ml-2 w-12 h-12 grow-0 shrink-0 basis-auto "></PersonCircle>
        )}
      </div>
    </>
  );
}
