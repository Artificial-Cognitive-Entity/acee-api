"use client";
import React from "react";
import { Jirasoftware } from "@styled-icons/simple-icons";
import { Confluence } from "@styled-icons/simple-icons";
import { GoogleDrive } from "@styled-icons/entypo-social/GoogleDrive";
import { ExternalLink } from "../ExternalLink";
import { ExternalLinkNoArrow } from "../ExternalLinkNoArrow";
import { FolderFill } from "@styled-icons/bootstrap/FolderFill";
import DriveIcon from "./DriveIcon";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// const ConfluenceIcon = () => {
//   // Replace the path with the actual path to your icon
//   return <img src="/path-to-your-confluence-icon.png" className="inline-block align-middle" alt="Confluence Icon" />;
// };

const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const toPercentage = (num: GLfloat) => {
  return `${(num * 100).toFixed(2)}%`;
};

const convertToReadableDate = (dateString: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateObject = new Date(dateString);
  dateObject.setHours(dateObject.getHours() - 5);
  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();

  return `${months[monthIndex]} ${day}, ${year}`;
};

const AccordionRoot = ({ root }: { root: any }) => {
  const renderCodeBlocks = () => {
    // get codeblocks wrapped in triple backtickets
    const codeBlocks = root.content.split("```");

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
    });
  };

  return (
    <div className="w-full">
      <div className="border-4 bg-base-300 border-base-100 duration-500 rounded-xl shadow-xl p-5 flex-col">
        <div className="flex items-center w-full p-5">
          {" "}
          {/* Logo and Node Descriptions */}
          {root.node_source == "jira" && (
            <Jirasoftware className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
          )}
          {root.node_source == "confluence" && (
            <Confluence className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
          )}
          {root.node_source == "google_drive" && (
            <div className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center">
              <DriveIcon />
            </div>
            // <GoogleDrive className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
          )}
          <div className="flex flex-col ml-4">
            <h1 className="ml-4 mr-4">{`${root.node_title}`}</h1>
            <div className="text-blue-600 text-sm  ml-4 mr-4 z-10">
              <div className="z-10 hover:underline cursor-pointer">
                <ExternalLink href={root.url}>{root.url}</ExternalLink>
              </div>
            </div>
            <div className="text-sm ml-4 mr-4 inline-block align-middle">
              {/*Folder Icon*/}
              <FolderFill className="w-3 h-3 inline-block align-middle" />
              <p className="inline"> </p>

              {/*Parent Node Title/Link*/}
              <div className="inline z-10 cursor-pointer">
                <ExternalLinkNoArrow href={root.parent_node_url}>
                  {root.parent_node_title}
                </ExternalLinkNoArrow>
              </div>

              {/*Node Details*/}
              <p className="inline">
                {" "}
                • Updated {convertToReadableDate(root.last_updated)} •
                Confidence {toPercentage(root.score)} |{" "}
              </p>
              {root.node_source == "jira" && (
                <>
                  <Jirasoftware className="w-3 h-3 inline-block align-middle" />
                  <p className="inline"> Jira</p>
                </>
              )}

              {root.node_source == "confluence" && (
                <>
                  <Confluence className="w-3 h-3 inline-block align-middle" />
                  <p className="inline"> Confluence</p>
                </>
              )}

              {root.node_source == "google_drive" && (
                <>
                  <GoogleDrive className="w-3 h-3 inline-block align-middle" />
                  <p className="inline"> Google Drive</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center w-full p-5 ">
          {" "}
          {/* Content Preview */}
          <div className="flex flex-col ml-4 w-full">
            {/* Summary text */}
            {root.content_type == "text" && (
              <p className="text-sm ml-4 mr-4">{root.content_preview}</p>
            )}

            {root.content_type == "image" && (
              <div className="flex content-center justify-center w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-sm"
                  alt="image from google bucket"
                  src={root.content}
                />
              </div>
            )}

            {root.content_type == "code" && (
              <div className="flex content-center justify-center w-full text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {renderCodeBlocks()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionRoot;
