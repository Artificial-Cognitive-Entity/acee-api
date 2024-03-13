import { generatePassword } from "@/app/lib/generatePassword";
import Translator, { ContentTranslator } from "../../lib/typechat/translator";
import { geckoEmbedding } from "@/app/lib/models/vertexai";
import { Question } from "@/app/lib/typechat/searchSchema";
import mysql from "mysql2/promise";

const HOST = process.env.HOST;
const PASSWORD = process.env.PASSWORD;
const USER = process.env.SINGLESTORE_USER;
const DATABASE = process.env.DATABASE;

if (!HOST || !PASSWORD || !USER) {
  throw Error("db info scuffed");
}

//this function connects to singlestoredb
export async function connectSingleStore() {
  let singleStoreConnection;

  //pass creds to mysql
  try {
    singleStoreConnection = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });
    return singleStoreConnection;
  } catch (err) {
    console.error("ERROR", err);

    process.exit(1);
  }
}
//ends singlestore connection
export async function stopSingleStore(conn: mysql.Connection) {
  await conn.end();
}

//search for token in users table
export async function findToken({
  conn,
  token,
}: {
  conn?: mysql.Connection;
  token: string;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    const query: any = `SELECT * FROM users WHERE token = "${token}"`;
    const result: any = await conn.query(query);

    if (result) {
      return result[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}

//search for duplicate email address in users table
export async function findEmail({
  conn,
  email,
}: {
  conn?: mysql.Connection;
  email: string;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    const query: any = `SELECT * FROM users WHERE email = "${email.toLowerCase()}"`;
    const result: any = await conn.query(query);

    if (result) {
      return result[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}

//insert new user
export async function addUser({
  conn,
  fName,
  lName,
  email,
  role,
}: {
  conn?: mysql.Connection;
  fName: string;
  lName: string;
  email: string;
  role: string;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }
    const insertRoles = {
      roles: [role],
    };

    // get date created in EST
    const offset = -300;
    const date: string = new Date(new Date().getTime() + offset * 60 * 1000)
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");

    //TODO: need to get groups from the user that is logged in

    const password = await generatePassword();
    const query = `INSERT INTO users (user_id, groups, first_name, last_name, email, password, status, session_id, created_at, roles, conversations) 
    VALUES(UUID(),${null},"${fName}","${lName}","${email}","${password}","unverified",${null},"${date}",'${JSON.stringify(
      insertRoles
    )}',${null})`;
    const result = await conn.query(query);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}

//finds the most relevant document to the user's query
// used for chatting
export async function findRelevantDocs({
  conn,
  embedding,
}: {
  conn?: mysql.Connection;
  embedding: any;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    //SQL QUERY - takes the embedding, converts it to a vector singlestore recognizes,
    //  does the dot product between that vector and all the vectors in the table
    // returns the content id

    const embedQuery =
      "SELECT content_id, DOT_PRODUCT_F64(JSON_ARRAY_PACK_F64('[" +
      embedding +
      "]'), embedding) AS score FROM embeddings ORDER BY score DESC LIMIT 1";

    const res: any = await getIDs(conn, embedQuery, "chat");
    const relevantDoc = await getDocument(conn, res.content_id, "chat");
    return relevantDoc;
  } catch (error) {
    console.log(error);
    return error;
    //!IMPORTANT! end connection after each query
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}
//search the database
export async function searchDatabase({
  conn,
  input,
}: {
  conn?: mysql.Connection;
  input: string;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    let parsedInput: any;
    let embedding;
    let response: any = await Translator().translate(input);

    //response went through, embedd the description field
    if (response.success) {
      parsedInput = JSON.parse(JSON.stringify(response.data, undefined, 3)); // turn it into a JSON object
      embedding = await geckoEmbedding(parsedInput.result[0].description);
    }
    // if it didn't go through embed the entire text
    else {
      embedding = await geckoEmbedding(input);
    }

    const embedQuery =
      "SELECT content_id, DOT_PRODUCT_F64(JSON_ARRAY_PACK_F64('[" +
      embedding +
      "]'), embedding) AS score FROM embeddings ORDER BY score DESC LIMIT 10 ";

    const res: any = await getIDs(conn, embedQuery, "search");

    let projects: any = [];

    for (let i = 0; i < res.length; i++) {
      if (res[i].score > 0.5) {
        // const document = await getDocument(
        //   conn,
        //   res[i],
        //   parsedInput.result[0].filter.type
        // );
        await groupByParent(
          projects,
          conn,
          res[i],
          parsedInput.result[0].filter.type
        );
      }
    }
    return projects;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}

// to group jira issues by project
async function groupByParent(
  projArr: any,
  conn: mysql.Connection,
  result: any,
  filter?: string
) {
  
  const document = await getDocument(conn, result, "search", filter);

  // TODO: GROUP DOCUMENTS BY THEIR PARENT
  // CHECK IF DOCUMENT IS A PARENT (PARENT_ID == NULL)
  // IF DOCUMENT IS A PARENT, CHECK IF IT HAS A CHILDREN
  // IF PARENT, ADD THE NODE TO THE PROJECT

  // IF DOCUMENT IS A PARENT, MAKE DOCUMENT A ROOT KEY, ADD CHILDREN ARRAY
  // IF DOCUMENT IS A CHILD, IT MUST HAVE A PARENT_ID.
  // GET PARENT_ID AND ADD IT TO THE CORRECT PLACE IN THE PROJECT




  /*


  [
    {
        "node_title": "Security Operations Center",
        "node_type": "space",

        "children": [
          {
              "node_title": "Security Operations Center Home",
              "node_type": "page",
              "children"


          }




        ]






    }







  ]
  */
}

//get and format doc into json
async function getDocument(
  conn: mysql.Connection,
  result: any,
  type: string,
  filter?: string
) {
  let query;

  const content_id = result.content_id;
  const node_id = result.node_id;

  // if (filter) {
  //   query = `
  //   SELECT content, content_type FROM contents WHERE content_id = '"${content_id}"' AND content_type = '"${filter}"'
  //   `;
  // } else {
  //   query = `
  //   SELECT content, content_type FROM contents WHERE content_id = '"${content_id}"'`;
  // }

  query = `
  SELECT content, content_type FROM contents WHERE content_id = '"${content_id}"'`;
  let content: any = await getContent(conn, query);

  let node: any = await getNode(conn, node_id);

  if (type == "search") {
    return {
      node_title: node.node_title.replace(/["]+/g, ""),
      node_type: node.node_type.replace(/["]+/g, ""),
      content: content.content.replace(/["]+/g, ""),
      content_type: content.content_type.replace(/["]+/g, ""),
      url: node.url.replace(/["]+/g, ""),
      data_source: node.data_source.replace(/["]+/g, ""),
      last_updated: node.last_updated.replace(/["]+/g, ""),
      parent_id: node.parent_id.replace(/["]+/g, ""),
      children_ids: node.parent_id.replace(/["]+/g, ""),
    };
  }

  return {
    node_title: node.node_title.replace(/["]+/g, ""),
    node_type: node.node_type.replace(/["]+/g, ""),
    content: content.content.replace(/["]+/g, ""),
    content_type: content.content_type.replace(/["]+/g, ""),
    url: node.url.replace(/["]+/g, ""),
    data_source: node.data_source.replace(/["]+/g, ""),
    last_updated: node.last_updated.replace(/["]+/g, ""),
  };
}

async function getContent(conn: mysql.Connection, query: string) {
  const content: any = await conn.query(query);
  return content[0][0];
}

async function getNode(conn: mysql.Connection, node_id: string) {
  const query = `
  SELECT node_type, node_title, url, data_source, last_updated, parent_id, children_ids FROM nodes WHERE node_id = '"${node_id}"'
  `;
  const result: any = await conn.query(query);
  return result[0][0];
}

//utility functions
async function getIDs(conn: mysql.Connection, query: string, type: string) {
  const res: any = await conn.query(query);
  const search_result = res[0];
  let content_id = "";
  let node_id = "";

  // return is different based on whether this is for a search or  chat function
  let result = [];

  if (type == "search") {
    // get the node id by splitting by the dash, return the sim. score
    // extract the node id from the content id
    for (let i = 0; i < search_result.length; i++) {
      // get content id
      content_id = search_result[i].content_id.replace(/["]+/g, "");

      //extract node id from content_id
      node_id = search_result[i].content_id.split("-")[0].replace(/["]+/g, "");

      result.push({
        node_id: node_id,
        content_id: content_id,
        score: search_result[i].score,
      });
    }

    return result;
  }

  content_id = search_result[0].content_id.replace(/["]+/g, "");
  node_id = search_result[0].content_id.split("-")[0].replace(/["]+/g, "");

  // return for chat use
  // TODO: REDO
  return { node_id: node_id, content_id: content_id };
}
