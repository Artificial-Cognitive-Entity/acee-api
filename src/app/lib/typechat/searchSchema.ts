// the following is a schema definition for querying our database
export interface Question {
  result: Query[];
}

//use this type for user queries
export interface Query {
  //anything the user enters should go here,
  description: string;
  // if the user specifies a filter it should go here
  filter?: ContentType;
}

export type ContentType =
  | Image
  | Code
  | Author
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

export interface Text {
  type: "text";
}
export interface Title {
  type: "title";
}
