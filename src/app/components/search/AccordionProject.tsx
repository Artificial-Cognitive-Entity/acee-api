"use client";
import React from "react";
import { Jirasoftware } from "@styled-icons/simple-icons";
import { Confluence } from "@styled-icons/simple-icons";
import { Dot } from "@styled-icons/bootstrap";
import Boards from "./Board";
import { ExternalLink } from "../ExternalLink";
import Image from "next/image";
import openai from "@/app/lib/models/openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";


const AccordionRoot = ({ root }: { root: any }) => {
  return (
    <div className="w-full">
      <div className="border-4 bg-base-300 border-base-100 duration-500 rounded-xl shadow-xl p-5 flex-col">
        <div className="flex items-center w-full p-5"> {/* Logo and Node Descriptions */}
          {root.node_source == "jira" && (
            <Jirasoftware className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
          )}

          {root.node_source == "confluence" && (
            <Confluence className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
          )}
          <div className="flex flex-col ml-4">
            <h1 className="ml-4 mr-4">{`${root.node_title}`}</h1>
            <div className="text-blue-600 text-sm  ml-4 mr-4 z-10">
              <div className="z-10 hover:underline cursor-pointer">
                <ExternalLink href={root.url}>
                  {root.url}
                </ExternalLink>
              </div>
            </div>
            <div className="text-sm ml-4 mr-4">
              <p>Last Updated: {root.last_updated}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full p-5"> {/* Content Preview */}
          <div className="flex flex-col ml-4">
            {/* Summary text */}
            {root.content_type != "image" &&
              root.content_type != "code" &&
              root.content_type != "title" && 
              (
                <p className="text-sm ml-4 mr-4">
                  {root.content_preview}
                </p>
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
          </div>
        </div>
        <div>
          <div className="flex-col w-full">
            {root.children.length > 0 ? (
              <>
                {root.children.map((child: any, index: any) => (
                  <Boards board={child} key={index}></Boards>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionRoot;
