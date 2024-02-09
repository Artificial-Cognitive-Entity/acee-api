import React from "react";

const Issue = ({ issue }: { issue: any }) => {
  return (
    <div className="mb-8">
      <div>
        <div>Issue title: {`${issue.issue_title}`}</div>
        <p>Created on: {`${issue.issue_created}`}</p>
      </div>
      <div>{`${issue.issue_type}`}</div>

      {
        (issue.issue_desc = "None" ? (
          <div></div>
        ) : (
          <div>{`${issue.issue_desc}`}</div>
        ))
      }

      <p>Issue Status: {`${issue.issue_status}`}</p>
    </div>
  );
};

export default Issue;
