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

const truncateText = (project: any) => {
  if (
    project.parent_content_type === "text" ||
    project.parent_content_type === "title"
  ) {
    const text = project.parent_content;
    const maxLength = 100;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  } else {
    return project.parent_content_type;
  }
};

const AccordionProject = ({ project }: { project: any }) => {
  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-arrow join-item border-4 bg-base-300 border-base-100 duration-500 rounded-xl shadow-xl">
        <input
          type="radio"
          name="my-accordion-4"
          className="w-auto h-auto"
          defaultChecked
        />
        <div className="collapse-title text-xl font-medium">
          <div className="flex items-center w-full">
            {project.parent_source == "jira" && (
              <Jirasoftware className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
            )}

            {project.parent_source == "confluence" && (
              <Confluence className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
            )}
            <div className="flex flex-col ml-4">
              <h1 className="ml-4 mr-4">{`${project.parent_title}`}</h1>
              <div className="text-blue-600 text-sm  ml-4 mr-4 z-10">
                <div className="z-10 hover:underline cursor-pointer">
                  <ExternalLink href={project.parent_url}>
                    {project.parent_url}
                  </ExternalLink>
                </div>
              </div>

              {project.parent_content_type != "image" &&
                project.parent_content_type != "code" && (
                  <p className="text-sm ml-4 mr-4">
                    {project.parent_content_preview}
                  </p>
                )}

              {/* Summary text */}
              {project.parent_content_type == "image" && (
                <div className="flex content-center justify-center w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="rounded-lg"
                    alt="image from google bucket"
                    src={project.parent_content}
                  />
                </div>
              )}
            </div>
          </div>

          <div className=" inline-flex items-center rounded-xl transition ease-in-out delay-150 hover:cursor-pointer">
            {/* <div>
                {project.project_info.project_status == "active" ? (
                  <Dot className="w-14 h-14 animate-pulse hover:no-animation text-green-700" />
                ) : (
                  <Dot className="w-10 h-10 animate-pulse text-red-700" />
                )}
              </div> */}
          </div>
          {/* </div> */}
        </div>
        <div className="collapse-content">
          <div className="flex-col w-full">
            {project.children.length > 0 ? (
              <>
                {project.children.map((child: any, index: any) => (
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

export default AccordionProject;
