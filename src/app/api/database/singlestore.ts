import { generatePassword } from "@/app/lib/generatePassword";
import Translator, { ContentTranslator } from "../../lib/typechat/translator";
import { format, parseISO } from "date-fns";
import { geckoEmbedding } from "@/app/lib/models/vertexai";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import openai from "@/app/lib/models/openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

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

interface User {
  id: number;
  email: string;
  role: string;
  passwordHash?: string;
  groups: string;
}

export interface GroupMember {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  token: string;
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

interface NodeContentPair {
  score: GLfloat;
  node_id?: string;
  node_title: string;
  parent_id?: string;
  parent_node_title: string;
  parent_node_url: string;
  node_type: string;
  url: string;
  content: string;
  content_type: string;
  content_preview?: string;
  last_updated: string;
  node_source: string;
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

// update password and status variable user
export async function updateUserPasswordStatus({
  password,
  status,
  token,
  conn,
}: {
  password: string;
  status: string;
  token: string;
  conn?: mysql.Connection;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    const query = `UPDATE users SET password = '${password}', status = '${status}' WHERE token = '${token}'`;

    const result: any = await conn.query(query);

    if (result) {
      console.log(result);
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

// update password
export async function updateUserPassword({
  password,
  token,
  conn,
}: {
  password: string;
  token: string;
  conn?: mysql.Connection;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    const query = `UPDATE users SET password = '${password}' WHERE token = '${token}'`;

    const result: any = await conn.query(query);

    if (result) {
      console.log(result);
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
  admin_group,
  user_id,
  conn,
}: {
  admin_group: string;
  user_id: string;
  conn?: mysql.Connection;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    const query = `DELETE FROM users WHERE user_id = '${user_id}'`;

    const result: any = await conn.query(query);

    const target_id = user_id;
    await UpdateGroup({ admin_group, target_id, conn });

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

    const query = `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', status = '${status}', role = '${role}' WHERE user_id = '${user_id}'`;

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

// for user login
export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  const connection = await connectSingleStore();
  console.log(`Attempting to authenticate user: ${email}`); // Log the attempt

  try {
    const query =
      "SELECT user_id, email, password AS passwordHash, role, groups FROM users WHERE email = ? LIMIT 1";
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(query, [
      email,
    ]);

    if (rows.length === 0) {
      console.log("No user found with that email."); // Log when no user is found
      return null;
    }

    const user = rows[0] as User; // Cast the result to your User type
    console.log(user);
    if (!user.passwordHash) {
      console.log("User found but no password hash present."); // Log missing password hash
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    console.log(user.passwordHash);
    console.log(`Password match result: ${passwordMatch}`); // Log the result of bcrypt.compare

    if (!passwordMatch) {
      console.log("Password does not match."); // Log failed password comparison
      return null;
    }

    // Passwords match, construct a new user object without the passwordHash
    const { passwordHash, ...userWithoutHash } = user;
    console.log("Authentication successful."); // Log successful authentication
    return userWithoutHash; // Return the user object without the password hash
  } catch (error) {
    console.error("Error during user authentication:", error);
    return null;
  } finally {
    await stopSingleStore(connection); // Ensure the database connection is closed
  }
}

//insert new user
export async function addUser(
  {
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
  },
  admin: any
) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    // get date created in EST
    const offset = -300;
    const date: string = new Date(new Date().getTime() + offset * 60 * 1000)
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");

    // generate a password, an id, and a token for the new user
    const password = await generatePassword();
    const target_id = uuidv4();
    const token: string = generateToken(target_id);

    const query = `INSERT INTO users (user_id, groups, first_name, last_name, email, password, status, session_id, created_at, role, conversations, token) 
    VALUES("${target_id}",'${
      admin.group
    }',"${fName}","${lName}","${email}","${password}","Unverified",${null},"${date}",'${role}',${null}, "${token}")`;
    const result: any = await conn.query(query);

    const admin_group = admin.group;
    await addGroupMember({ admin_group, target_id, conn });

    if (result) {
      return token;
    } else {
      return null;
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

export async function getGroupMembers({
  admin_group,
  admin_id,
  conn,
}: {
  admin_group: string;
  admin_id: string;
  conn?: mysql.Connection;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    let query = `SELECT members FROM groups WHERE group_title = '${admin_group}'`;
    let result: any = await conn.query(query);

    if (result[0].length == 0) {
      return null;
    }

    let members = result[0][0].members.members;

    let group: Array<GroupMember> = [];
    for (let i = 0; i < members.length; i++) {
      if (members[i] != admin_id) {
        query = `SELECT user_id, first_name, last_name, email, status, role, token FROM users WHERE user_id = '${members[i]}'`;
        result = await conn.query(query);

        group.push(result[0][0]);
      } else {
        continue;
      }
    }

    return group;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addGroupMember({
  admin_group,
  target_id,
  conn,
}: {
  admin_group: string;
  target_id: string;
  conn?: mysql.Connection;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    let query = `SELECT members FROM groups WHERE group_title = '${admin_group}'`;
    let result: any = await conn.query(query);

    // console.log(result[0][0].members.members);
    let members = result[0][0].members.members;

    // add new user to the members object
    members.push(target_id);

    const updatedMembers = {
      members: members,
    };

    query = `UPDATE groups SET members = '${JSON.stringify(
      updatedMembers
    )}' WHERE group_title = '${admin_group}'`;

    result = await conn.query(query);

    console.log(result);
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function UpdateGroup({
  admin_group,
  target_id,
  conn,
}: {
  admin_group: string;
  target_id: string;
  conn?: mysql.Connection;
}) {
  try {
    if (!conn) {
      conn = await connectSingleStore();
    }

    let query = `SELECT members FROM groups WHERE group_title = '${admin_group}'`;
    let result: any = await conn.query(query);

    let members = result[0][0].members.members;

    // console.log("BEFORE", members);
    members = await removeMember(target_id, members);

    // console.log("after", members);

    const updatedMembers = {
      members: members,
    };

    query = `UPDATE groups SET members = '${JSON.stringify(
      updatedMembers
    )}' WHERE group_title = '${admin_group}'`;

    result = await conn.query(query);

    // console.log(result);
  } catch (error) {
    console.log(error);
    return error;
  }
}

//finds the most relevant pair to the user's query
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
      "]'), embedding) AS score FROM embeddings ORDER BY score DESC LIMIT 3";

    const res: Array<ID> = await getIDs(conn, embedQuery, "chat");

    let array: Array<any> = [];

    for (let i = 0; i < res.length; i++) {
      await fetchAndAddToNodeList(array, conn, res[i], "chat");
    }

    // Sort node_list
    array.sort(
      (node_a: NodeContentPair, node_b: NodeContentPair) =>
        node_b.score - node_a.score
    );

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

    console.log("CHECKING TYPECHAT");
    console.log(JSON.stringify(parsedInput, undefined, 3)); // turn it into a JSON object

    if (!parsedInput) {
      return [];
    }
    const embedQuery =
      "SELECT content_id, DOT_PRODUCT_F64(JSON_ARRAY_PACK_F64('[" +
      embedding +
      "]'), embedding) AS score FROM embeddings ORDER BY score DESC LIMIT 10 ";

    const res: Array<ID> = await getIDs(conn, embedQuery, "search");
    let node_list: any = [];

    for (let i = 0; i < res.length; i++) {
      // console.log("\nResult:");
      // console.log(res[i].score);
      // console.log(res[i].content_id);

      // console.log("Res: " + res[i].content_id);
      // console.log("Node list: " + JSON.stringify(node_list));

      if (parsedInput.result[0].filter)
        await fetchAndAddToNodeList(
          node_list,
          conn,
          res[i],
          "search",
          parsedInput.result[0].filter.type
        );
      else {
        await fetchAndAddToNodeList(node_list, conn, res[i], "search");
      }

      // console.log("PRINT NODE LIST");
      // console.log(JSON.stringify(node_list));
    }

    // Sort node_list
    node_list.sort(
      (node_a: NodeContentPair, node_b: NodeContentPair) =>
        node_b.score - node_a.score
    );

    const filtered_node_ids: string[] = [];
    const filtered_nodes: NodeContentPair[] = [];

    // lopp through each node in the node list
    for (const node of node_list) {
      // if node is not already in the list, add it
      if (!filtered_node_ids.includes(node.node_id)) {
        filtered_nodes.push(node);
        filtered_node_ids.push(node.node_id);
      }

      // if the node is in the list and is of content_type text, search for an existing node
      else if (
        filtered_node_ids.includes(node.node_id) &&
        node.content_type == "text"
      ) {
        // !!IMPORTANT!!  look for existing node based on node_id and content_type
        const existingNode = filtered_nodes.find(
          (n) => n.node_id === node.node_id && n.content_type == "text"
        );

        // if existing node is found, add more text to it
        if (existingNode) {
          existingNode.content += node.content;
        }

        // if existing node is not found that means it is an image or code with the same node ID and it should be its own separate node.
        else {
          filtered_nodes.push(node);
        }
      }
    }

    // Generate content previews
    for (const node of filtered_nodes) {
      // generate a preview for text only
      if (node.content_type == "text") {
        node.content_preview = await getPreview(input!, node);
      }

      // if content is not of text type, remove content_preview field.
      else {
        delete node.content_preview;
      }
    }

    return filtered_nodes;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}

export async function getPreview(query: string, result: any) {
  const prompt: string = `Given the following prompt: "${query}", and the following block of content:
    "${result.content}", please summarize the relevant content block and relate it to the prompt. 

      You will adhere to all of the following rules when generating your response:

      Rules:
        1) Your summary will ONLY reference the content block.
        2) You will NOT generate summary information that is not reflected in the content block.
        3) Your summary will be 3 sentences or less.
        4) Your summary will not repeat the prompt.
        5) Your summary will not use the words "content block".
      
      `;

  const systemMessage: ChatCompletionMessage = {
    role: "assistant",
    content: prompt,
  };

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [systemMessage],
    top_p: 0.2,
    temperature: 0.3,
  });

  if (response.choices[0].message.content != null) {
    return response.choices[0].message.content;
  } else {
    return "No Preview";
  }
}

//get nodes from database and add them to a list
async function fetchAndAddToNodeList(
  node_list: any,
  conn: mysql.Connection,
  result: any,
  type: string,
  filter?: string
) {
  const pair = await getNodeContentPair(
    conn,
    result,
    type,
    result.score,
    filter
  );

  if (pair == null) {
    return;
  }

  if (type == "search") {
    const root: NodeContentPair = {
      score: result.score,
      node_id: pair.node_id,
      node_title: pair.node_title,
      parent_id: pair.node_id,
      parent_node_title:
        pair.parent_node_title == "null" ? null : pair.parent_node_title,
      parent_node_url:
        pair.parent_node_url == "null" ? null : pair.parent_node_url,
      node_type: pair.node_type,
      url: pair.url,
      content: pair.content,
      content_preview: "placeholder",
      last_updated: pair.last_updated,
      content_type: pair.content_type,
      node_source: pair.data_source,
      children_ids: pair.children_ids,
      children: [],
    };
    node_list.push(root);
  } else {
    const root: NodeContentPair = {
      score: result.score,
      node_id: pair.node_id,
      node_title: pair.node_title,
      parent_id: pair.node_id,
      parent_node_title:
        pair.parent_node_title == "null" ? null : pair.parent_node_title,
      parent_node_url:
        pair.parent_node_url == "null" ? null : pair.parent_node_url,
      node_type: pair.node_type,
      url: pair.url,
      content: pair.content,
      last_updated: pair.last_updated,
      content_type: pair.content_type,
      node_source: pair.data_source,
      children_ids: pair.children_ids,
      children: [],
    };
    node_list.push(root);
  }
}

//get and format doc into json
async function getNodeContentPair(
  conn: mysql.Connection,
  result: any,
  type: string,
  score: GLfloat,
  filter?: string
) {
  let query;

  const content_id = result.content_id;

  if (filter) {
    query = `
    SELECT content, content_type FROM contents WHERE content_id = '${content_id}' AND content_type = '${filter}'
    `;
  } else {
    query = `
    SELECT content, content_type FROM contents WHERE content_id = '${content_id}'`;
  }
  let content: any = await getContent(conn, query);

  if (content == null) {
    return;
  }

  let node_id: any = await getNodeId(conn, content_id);

  // console.log(`NODE_ID: ${node_id}`)
  let node: any = await getNode(conn, node_id);

  let parent: any =
    node && node.parent_id !== "null"
      ? await getNode(conn, node.parent_id)
      : null;

  if (!node) {
    console.error(`No node found for node_id: ${node_id}`);
    return;
  }

  // console.log(
  //   `\nNODE TITLE: ${node.node_title}\nDATA SOURCE: ${node.data_source}\nPARENT_ID: ${node.parent_id}\nNODE_ID:${node.node_id} `
  // );

  let parent_node_title = null;
  let parent_node_url = null;
  let node_url = null;

  if (parent) {
    parent_node_title = parent.node_title;

    if (parent.node_type == "page") {
      parent_node_url = modifyUrl(parent.url);
    } else {
      parent_node_url = parent.url;
    }
  }

  if (node.node_type == "page") {
    node_url = modifyUrl(node.url);
  } else {
    node_url = node.url;
  }

  if (type == "search") {
    return {
      score: score,
      node_title: node.node_title,
      node_id: node_id,
      node_type: node.node_type,
      content: content.content,
      content_type: content.content_type,
      url: node_url,
      data_source: node.data_source,
      last_updated: node.last_updated,
      parent_id: node.parent_id == "null" ? null : node.parent_id,
      children_ids: JSON.parse(node.children_ids),
      parent_node_title: parent_node_title,
      parent_node_url: parent_node_url,
    };
  }

  return {
    score: score,
    node_title: node.node_title,
    node_type: node.node_type,
    content: content.content,
    content_type: content.content_type,
    url: node_url,
    data_source: node.data_source,
    last_updated: node.last_updated,
    parent_id: parent ? null : node.parent_id,
    parent_node_title: parent_node_title,
    parent_node_url: parent_node_url,
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

async function getNodeId(conn: mysql.Connection, content_id: string) {
  const query = `
  SELECT distinct node_id FROM contents WHERE content_id = '${content_id}'
  `;
  const result: any = await conn.query(query);
  return result[0][0].node_id;
}

//utility functions
async function getIDs(conn: mysql.Connection, query: string, type: string) {
  const res: any = await conn.query(query);
  const search_result = res[0];

  let content_id = "";
  let node_id = "";

  let result: Array<ID> = [];

  // get the node id by splitting by the dash, return the sim. score
  // extract the node id from the content id
  let node_info: ID = {
    node_id: "",
    content_id: "",
  };
  for (let i = 0; i < search_result.length; i++) {
    if (search_result[i].score > 0.65) {
      // get content id
      content_id = search_result[i].content_id;
      //extract node id from content_id
      node_id = search_result[i].content_id.split("-")[0];

      node_info = {
        node_id: node_id,
        content_id: content_id,
        score: search_result[i].score,
      };

      result.push(node_info);
    }
  }

  return result;
}

async function getJiraContent(pair: any) {
  // console.log("INSIDE GET JIRA CONTENT");
  const parsedContent = await parseJira(pair.content);
  // console.log(parsedContent);

  const jira: JiraNode = {
    content_type: pair.content_type,
    last_updated: pair.last_updated,
    source: pair.data_source,
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

async function addChild(parentIndex: number, pair: any, node_list: any) {
  const childIndex = findChildIndex(pair.node_id, parentIndex, node_list);

  // child node was found to add to the items array
  if (childIndex != -1) {
    console.log("CHILD FOUND");
    if (pair.data_source == "jira") {
      const jira = await getJiraContent(pair);
      node_list[parentIndex].children[childIndex].items.push(jira);
    } else {
      const item: ItemNode = {
        content: pair.content,
        content_type: pair.content_type,
        last_updated: pair.last_updated,
        source: pair.data_source,
      };

      node_list[parentIndex].children[childIndex].items.push(item);
    }
    // console.log("CHILD FOUND");
    // console.log(
    //   `ADDING ${item.id} TO ${node_list[parentIndex].children[childIndex].child_id} IN ${node_list[parentIndex].parent_id}`
    // );
  }

  // not found make a new child object
  else {
    // console.log("CHILD NOT FOUND, MAKING NEW CHILD NODE");
    const child: ChildNode = {
      child_title: pair.node_title,
      child_id: pair.node_id,
      child_type: pair.node_type,
      child_url: pair.url,
      items: [],
    };

    if (pair.data_source == "jira") {
      // console.log("pair IS FROM JIRA");
      // console.log(`PARSING ${pair.content}`);
      const jira = await getJiraContent(pair);
      child.items.push(jira);
      node_list[parentIndex].children.push(child);
    } else {
      // console.log(`THIS IS FROM: ${pair.data_source}`);
      const item: ItemNode = {
        content: pair.content,
        content_type: pair.content_type,
        last_updated: pair.last_updated,
        source: pair.data_source,
      };

      child.items.push(item);
      node_list[parentIndex].children.push(child);
    }
  }
}
// find parent node
function findParentIndex(parent_id: string, node_list: any) {
  const parent = node_list.find((obj: any) => {
    return obj.parent_id == parent_id;
  });
  return node_list.indexOf(parent);
}

function findNodeInList(node_id: string, node_list: any) {
  const node = node_list.find((obj: any) => {
    return obj.node_id == node_id;
  });

  // Returns node object from list if exists, else -1
  return node_list.indexOf(node);
}

// find child node
function findChildIndex(child_id: string, parentIndex: number, node_list: any) {
  let target: any = null;
  node_list.find((obj: any) => {
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

  return node_list[parentIndex].children.indexOf(target);
}

function removeMember(target_id: string, members: Array<string>) {
  return members.filter((id: string) => id != target_id);
}

function formatDateString(formatee: string) {
  const originalDate = parseISO(formatee);

  return format(originalDate, "yyyy-MM-dd HH:mm:ss");
}

function modifyUrl(url: string) {
  // Splitting the URL by '/'
  var urlParts = url.split("/");

  // Modifying the URL
  var modifiedUrl =
    urlParts.slice(0, 3).join("/") + "/wiki/" + urlParts.slice(3).join("/");

  return modifiedUrl;
}
