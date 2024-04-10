"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Linkify from "linkify-react";

const ChatBubble = ({ content }: { content: string }) => {
  // Function to identify code blocks and wrap them in <code> and <pre> tags
  const renderCodeBlocks = () => {
    // get codeblocks wrapped in triple backtickets
    const codeBlocks = content.split("```");

    return codeBlocks.map((block: any, index: number) => {
      // odd indexes represent code blocks
      if (index % 2 === 1) {
        const [language, codeContent] = block.split("\n"); // Extract language if available
        return (
          <SyntaxHighlighter
            key={index}
            language={language} // default to plaintext if language is not specified
            style={materialDark}
          >
            {block}
          </SyntaxHighlighter>
        );
      }

      // even indexes represent non-code content
      return (
        <div  className="max-w-[95%] break-words" key={index}>
        
            <Linkify options={{ target: "_blank" }}>{block}</Linkify>

        </div>
      );
    });
  };

  return <div>{renderCodeBlocks()}</div>;
};

export default ChatBubble;
