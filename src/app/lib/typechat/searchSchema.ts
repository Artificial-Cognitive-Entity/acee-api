// the following is a schema definition for querying our wikipedia/book database
export interface Question {
  result: Query[];
}

//TODO: SCHEMA NEEDS TWEAKING

//use this type for user queries
export interface Query {
  //anything the user enters should go here,
  description: string;
  filter?: ContentType;
}

export type ContentType =
  | Image
  | Code
  | Author
  | Issue
  | Description
  | Assignee
  | Status
  | Text
  | Title;

export interface Image {
  type: "image";
}

export interface Code {
  type: "code";
}

export interface Author {
  type: "author";
}

export interface Issue {
  type: "issue";
}

export interface Assignee {
  type: "assignee";
}

export interface Description {
  type: "description";
}

export interface Status {
  type: "status";
}
export interface Text {
  type: "text";
}
export interface Title {
  type: "title";
}
