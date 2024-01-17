// the following is a schema definition for querying our wikipedia/book database
export interface Question {

  result: (Query | UnknownText)[];

}


//use this type for user queries 
export interface Query {
  //a description of anything should go here
  description: string
  //if the user mentions a file extention, it should go here
  ext?: FileType
  //if the user mentions a source such as Jira, it should go here
  source?: Source


}

export type FileType = PDF | DOC 
export type Source = Jira | Conflu 

export interface PDF{
    type:"pdf"
}

export interface DOC{
    type:"doc"
}

export interface Jira{
    source:"jira"
}

export interface Conflu{
    type:"conflu"
}

// Use this type for items that match nothing else
export interface UnknownText {
  type: "unknown",
  text: string; // The text that wasn't understood
}
