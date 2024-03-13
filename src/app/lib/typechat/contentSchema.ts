// the following is a schema definition for querying our wikipedia/book database
export interface Content {
  result: (ContentInfo | UnknownText)[];
}

///use this type for the user content
export interface ContentInfo {
  // use this field for the title of the issue
  issue_title: string;
  // use this field for the type of the issue
  issue_type: string;
  // use this field for the description of the issue
  issue_description: string;
  // use this field for the creation date and time of the issue
  issue_created: string;
  // use this field for the assignee
  assignee: string;
  // use this field for the completion date
  completion: string;
  // use this field for the status of the issue
  status: string;
}

// Use this type for items that match nothing else
export interface UnknownText {
  type: "unknown";
  text: string; // The text that wasn't understood
}
