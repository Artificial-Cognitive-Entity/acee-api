// the following is a schema definition for querying our wikipedia/book database
export interface Question {

  result: (Query)[];

}

//TODO: SCHEMA NEEDS TWEAKING

//use this type for user queries 
export interface Query {

  //anything the user enters should go here,
  description: string

  //if the user mentions a source such as Jira or Confluence, it should go here. this field is case insensitive
  source?: string
}

