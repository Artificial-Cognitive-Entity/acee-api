import React from "react";
import ChatIcon from "./ChatIcon";

// chat greeting
const ChatGreeting = () => {
  return (
    <div className="w-full h-full gap-6 inline-flex flex-col items-center justify-center">
      <ChatIcon></ChatIcon>
      <div className="text-3xl">Chat with ACEE</div>
    </div>
  );
};

export default ChatGreeting;
