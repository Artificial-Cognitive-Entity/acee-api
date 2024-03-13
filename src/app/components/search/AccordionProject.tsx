"use client";
import React from "react";
import { Jirasoftware } from "@styled-icons/simple-icons";
import { Confluence } from "@styled-icons/simple-icons";
import { Dot } from "@styled-icons/bootstrap";
import Boards from "./Board";
import { ExternalLink } from "../ExternalLink";

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
          <div className="inline-flex items-center w-full">
            {project.parent_source == "jira" && (
              <Jirasoftware className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
            )}

            {project.parent_source == "confluence" && (
              <Confluence className="w-12 h-12 ml-2 mr-2 grow-0 shrink-0 basis-auto self-center text-blue-700" />
            )}

            <div className=" inline-flex items-center rounded-xl transition ease-in-out delay-150 hover:cursor-pointer">
              <h1 className="ml-4 mr-4">{`${project.parent_title}`}</h1>
              <ExternalLink href={project.parent_url}>
                {project.parent_url}
              </ExternalLink>

              {/* <div>
                {project.project_info.project_status == "active" ? (
                  <Dot className="w-14 h-14 animate-pulse hover:no-animation text-green-700" />
                ) : (
                  <Dot className="w-10 h-10 animate-pulse text-red-700" />
                )}
              </div> */}
            </div>
          </div>
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

// <div className="flex-col w-full">

//             {project.project_info.boards.length > 0 ? (
//               <>
//                 {project.project_info.boards.map((board: any, index: any) => (
//                   <Boards board={board} key={index}></Boards>
//                 ))}
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
export default AccordionProject;
