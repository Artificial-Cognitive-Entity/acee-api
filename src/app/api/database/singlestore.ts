import { generatePassword } from "@/app/lib/generatePassword";
import Translator, { ContentTranslator } from "../../lib/typechat/translator";
import { format, parseISO } from "date-fns";
import { geckoEmbedding } from "@/app/lib/models/vertexai";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";

const HOST = process.env.HOST;
const PASSWORD = process.env.PASSWORD;
const USER = process.env.SINGLESTORE_USER;
const DATABASE = process.env.DATABASE;

interface ItemNode {
  content?: string;
  content_type: string;
  source: string;
  last_updated: string;
}

interface JiraNode extends ItemNode {
  issue_title: string;
  issue_description: string;
  status: string;
  issue_type: string;
  assignee: string;
  completion: string;
  issue_created: string;
}

interface ChildNode {
  child_title: string;
  child_id: string;
  child_type: string;
  child_url: string;
  items: Array<ItemNode>;
}

interface ParentNode {
  parent_title: string;
  parent_id: string;
  parent_type: string;
  parent_url: string;
  parent_content: string;
  parent_content_type: string;
  parent_source: string;
  children_ids: Array<string>;
  children: Array<ChildNode>;
}

interface ID {
  node_id: string;
  content_id: string;
  score?: number;
}

if (!HOST || !PASSWORD || !USER) {
  throw Error("Database variable HOST, PASSWORD, or USER is missing ");
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

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
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

//  delete user
export async function deleteUser({
  conn,
  user_id,
}: {
  conn?: mysql.Connection;
  user_id: string;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    const query = `DELETE FROM users WHERE user_id =${user_id}`;

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

// update user
export async function updateUser({
  conn,
  first_name,
  last_name,
  role,
  user_id,
  status,
}: {
  conn?: mysql.Connection;
  first_name: string;
  last_name: string;
  role: string;
  user_id: string;
  status: string;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    const insertRoles = {
      roles: [role],
    };

    const query = `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', status = '${status}', roles = '${JSON.stringify(
      insertRoles
    )}' WHERE user_id = '${user_id}'`;

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

    // generate a password, an id, and a token for the new user
    const password = await generatePassword();
    const id = uuidv4();
    const token = generateToken(id);

    const query = `INSERT INTO users (user_id, groups, first_name, last_name, email, password, status, session_id, created_at, roles, conversations, token) 
    VALUES("${id}",${null},"${fName}","${lName}","${email}","${password}","unverified",${null},"${date}",'${JSON.stringify(
      insertRoles
    )}',${null}, "${token}")`;
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
      "]'), embedding) AS score FROM embeddings ORDER BY score DESC";

    const res: Array<ID> = await getIDs(conn, embedQuery, "chat");
    let array: Array<any> = [];

    for (let i = 0; i < res.length; i++) {
      await groupByParent(array, conn, res[i]);
    }

    // console.log(array);
    return array;
  } catch (error) {
    console.log(error);
    return null;
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

    const res: Array<ID> = await getIDs(conn, embedQuery, "search");
    // console.log(res);
    let projects: any = [];

    for (let i = 0; i < res.length; i++) {
      if (res[i].score! > 0.65) {
        if (parsedInput.result[0].filter)
          await groupByParent(
            projects,
            conn,
            res[i],
            parsedInput.result[0].filter.type
          );
        else {
          await groupByParent(projects, conn, res[i]);
        }
      }
    }
    projects = removeEmptyProjects(projects);
    // console.log(JSON.stringify(projects, null, 4));
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
  projects: any,
  conn: mysql.Connection,
  result: any,
  filter?: string
) {
  const document = await getDocument(conn, result, "search", filter);

  if (document == null) {
    return;
  }

  // console.log(projects);
  // console.log("LOOKING A THTIS SUTPUD FUCKING DOCUMENT");
  // console.log(document);
  // document is the root node

  const node_result = findNode(document.node_id, projects);
  if (document.parent_id == null && node_result == -1) {
    const root: ParentNode = {
      parent_title: document.node_title,
      parent_id: document.node_id,
      parent_type: document.node_type,
      parent_url: document.url,
      parent_content: document.content,
      parent_content_type: document.content_type,
      parent_source: document.data_source,
      children_ids: document.children_ids,
      children: [],
    };
    // console.log("ADDING ROOT\n");
    projects.push(root);
  }

  // find the parent
  else {
    if (document.parent_id == null) {
      return;
    }
    // console.log(projects);
    const parentIndex = findParent(document.parent_id, projects);

    // parent was found
    if (parentIndex != -1) {
      // add child
      // console.log("PARENT FOUND");
      await addChild(parentIndex, document, projects);
    }

    // child node (like page) is pulled in as a result before its parent (like space)
    //  query the database for the parent
    else {
      // get document's parent
      // console.log("PARENT NOT FOUND");
      const parent = await getNode(conn, document.parent_id);

      // console.log(parent);

      // get parent's content
      const query = `
          SELECT content, content_type FROM contents WHERE node_id = '${parent.node_id}'`;
      const parent_content = await getContent(conn, query);

      const parent_obj: ParentNode = {
        parent_title: parent.node_title,
        parent_id: parent.node_id,
        parent_type: parent.node_type,
        parent_url: parent.url,
        parent_content: parent_content.content,
        parent_content_type: parent_content.content_type,
        parent_source: parent.data_source,
        children_ids: JSON.parse(parent.children_ids),
        children: [],
      };

      projects.push(parent_obj);

      const parent_index = findParent(parent_obj.parent_id, projects);

      await addChild(parent_index, document, projects);
    }
  }
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

  if (filter) {
    query = `
    SELECT content, content_type FROM contents WHERE content_id = '${content_id}' AND content_type = '${filter}'
    `;
  } else {
    query = `
    SELECT content, content_type FROM contents WHERE content_id = '${content_id}'`;
  }

  let content: any = await getContent(conn, query);
  let node: any = await getNode(conn, node_id);

  if (content == null) {
    return;
  }

  console.log(
    `\nNODE TITLE: ${node.node_title}\nDATA SOURCE: ${node.data_source}\nPARENT_ID: ${node.parent_id}\nNODE_ID:${node.node_id} `
  );

  if (type == "search") {
    return {
      node_title: node.node_title,
      node_id: node_id,
      node_type: node.node_type,
      content: content.content,
      content_type: content.content_type,
      url: node.url,
      data_source: node.data_source,
      last_updated: node.last_updated,
      parent_id: node.parent_id == "null" ? null : node.parent_id,
      children_ids: JSON.parse(node.children_ids),
    };
  }

  return {
    node_title: node.node_title,
    node_type: node.node_type,
    content: content.content,
    content_type: content.content_type,
    url: node.url,
    data_source: node.data_source,
    last_updated: node.last_updated,
    parent_id: node.parent_id == "null" ? null : node.parent_id,
  };
}

async function getContent(conn: mysql.Connection, query: string) {
  const content: any = await conn.query(query);
  return content[0][0];
}

async function getNode(conn: mysql.Connection, node_id: string) {
  const query = `
  SELECT node_type, node_title, url, data_source, last_updated, parent_id, node_id, children_ids FROM nodes WHERE node_id = '${node_id}'
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
  let result: Array<ID> = [];

  // get the node id by splitting by the dash, return the sim. score
  // extract the node id from the content id
  let node_info: ID = {
    node_id: "",
    content_id: "",
  };
  for (let i = 0; i < search_result.length; i++) {
    // get content id
    content_id = search_result[i].content_id;
    //extract node id from content_id
    node_id = search_result[i].content_id.split("-")[0];

    if (type == "search") {
      node_info = {
        node_id: node_id,
        content_id: content_id,
        score: search_result[i].score,
      };
    } else {
      node_info = {
        node_id: node_id,
        content_id: content_id,
      };
    }

    result.push(node_info);
  }

  return result;
}

async function getJiraContent(document: any) {
  // console.log("INSIDE GET JIRA CONTENT");
  const parsedContent = await parseJira(document.content);
  // console.log(parsedContent);

  const jira: JiraNode = {
    content_type: document.content_type,
    last_updated: document.last_updated,
    source: document.data_source,
    issue_title: parsedContent.issue_title,
    issue_description: parsedContent.issue_description,
    status: parsedContent.status,
    issue_type: parsedContent.issue_type,
    assignee: parsedContent.assignee,
    issue_created: formatDateString(parsedContent.issue_created),
    completion:
      parsedContent.completion == "Not completed"
        ? "Not completed"
        : formatDateString(parsedContent.completion),
  };

  return jira;
}

async function parseJira(content: string) {
  // console.log("INSIDE TRANSLATOR");
  let response: any = await ContentTranslator().translate(content);
  //response went through, embedd the description field
  const parsedInput = JSON.parse(JSON.stringify(response.data, undefined, 3)); // turn it into a JSON object
  return parsedInput.result[0];
}

async function addChild(parentIndex: number, document: any, projects: any) {
  const childIndex = findChild(document.node_id, parentIndex, projects);

  // child node was found to add to the items array
  if (childIndex != -1) {
    // console.log("CHILD FOUND");
    if (document.data_source == "jira") {
      const jira = await getJiraContent(document);
      projects[parentIndex].children[childIndex].items.push(jira);
    } else {
      const item: ItemNode = {
        content: document.content,
        content_type: document.content_type,
        last_updated: document.last_updated,
        source: document.data_source,
      };

      projects[parentIndex].children[childIndex].items.push(item);
    }
    // console.log("CHILD FOUND");
    // console.log(
    //   `ADDING ${item.id} TO ${projects[parentIndex].children[childIndex].child_id} IN ${projects[parentIndex].parent_id}`
    // );
  }

  // not found make a new child object
  else {
    // console.log("CHILD NOT FOUND, MAKING NEW CHILD NODE");
    const child: ChildNode = {
      child_title: document.node_title,
      child_id: document.node_id,
      child_type: document.node_type,
      child_url: document.url,
      items: [],
    };

    if (document.data_source == "jira") {
      // console.log("DOCUMENT IS FROM JIRA");
      // console.log(`PARSING ${document.content}`);
      const jira = await getJiraContent(document);
      child.items.push(jira);
      projects[parentIndex].children.push(child);
    } else {
      // console.log(`THIS IS FROM: ${document.data_source}`);
      const item: ItemNode = {
        content: document.content,
        content_type: document.content_type,
        last_updated: document.last_updated,
        source: document.data_source,
      };

      child.items.push(item);
      projects[parentIndex].children.push(child);
    }

    // console.log("CHILD NOT FOUND");
    // console.log(`PARENT LOCATED AT ${parentIndex}`);
    // console.log(
    //   `ADDING ${item.id} TO ${child.child_id} IN ${projects[parentIndex].parent_id}`
    // );
  }
}
// find parent node
function findParent(parent_id: string, projects: any) {
  const parent = projects.find((obj: any) => {
    return obj.parent_id == parent_id;
  });
  return projects.indexOf(parent);
}

function findNode(node_id: string, projects: any) {
  const node = projects.find((obj: any) => {
    return obj.parent_id == node_id;
  });

  return projects.indexOf(node);
}

// find child node
function findChild(child_id: string, parentIndex: number, projects: any) {
  let target: any = null;
  projects.find((obj: any) => {
    if (obj.children) {
      const res = obj.children.find((child: any) => {
        if (child.child_id == child_id) {
          return child;
        } else {
          return null;
        }
      });

      target = res;
    }
  });

  return projects[parentIndex].children.indexOf(target);
}

// find grandparent node
function removeEmptyProjects(projects: any) {
  // console.log("REMOVING EMPTY PROJECTS");
  return projects.filter((project: ParentNode) => project.children.length > 0);
}

function formatDateString(formatee: string) {
  const originalDate = parseISO(formatee);

  return format(originalDate, "yyyy-MM-dd HH:mm:ss");
}
