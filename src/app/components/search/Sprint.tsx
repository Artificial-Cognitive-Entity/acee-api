import React, { useEffect, useState } from "react";

interface JiraContent {
  issue_title: string;
  issue_description: string;
  status: string;
  issue_type: string;
  assignee: string;
  completion: string;
  issue_created: string;
}

const Sprint = ({ item, url }: { item: any; url: string }) => {
  return (
    <div className="mb-8">
      {item.source == "jira" ? (
        <>
          <div className="stats shadow-xl bg-primary w-full rounded-lg">
            <div className="stat overflow-hidden w-full">
              <div className="stat-figure text-content hover:text-blue-700 hover: cursor-pointer">
                <a href={url} title="Open this issue in Jira" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-10 h-10 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </a>
              </div>
              <div>
                <div className="stat-title">{item.issue_type}</div>
                <div className="stat-desc text-lg w-fit ">
                  {item.issue_description}
                </div>
                <div className="stat-value">Assignee: {item.assignee}</div>
                <div className="stat-value">Status: {item.status}</div>
                <div className="stat-desc whitespace-normal">
                  Issue Created: {item.issue_created}
                </div>
                {item.completion == "Not completed" ? (
                  <div className="stat-desc">Not yet completed</div>
                ) : (
                  <div className="stat-desc">
                    {" "}
                    Completed on: {item.completion}
                  </div>
                )}
                <br />
                <div className="stat-desc">
                  Last modified: {`${item.last_updated}`}
                </div>
              </div>
            </div>
          </div>

          {/* <div>{item.issue_description}</div> */}
        </>
      ) : (
        <>
          {item.content_type == "code" && (
            <div className="mockup-code rounded-lg w-3/4">
              <code className="p-5">{`${item.content}`}</code>
            </div>
          )}

          {item.content_type != "code" && (
            <>
              <div>{`${item.content}`}</div>
              <div>{`${item.content_type}`}</div>
            </>
          )}
        </>
      )}

      <br></br>
      {/* <div className="stat-desc">Last modified: {`${item.last_updated}`}</div> */}
    </div>
  );
};

export default Sprint;
