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

    console.log(result[0]);
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
      "]'), embedding) AS score FROM embeddings_table ORDER BY score DESC LIMIT 1";

    const res: any = await getContentID(conn, embedQuery);

    const con_id: string = res[0].content_id;
    const relevantDoc = await getDocs(conn, con_id);
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
      "]'), embedding) AS score FROM embeddings_table ORDER BY score DESC LIMIT 10 ";

    const res: any = await getContentID(conn, embedQuery);

    let projects: any = [];

    for (let i = 0; i < 10; i++) {
      if (res[i].score > 0.6) {
        const con_id: string = res[i].content_id;
        const document = await getDocs(
          conn,
          con_id,
          true,
          parsedInput.result[0].source
        );
        await getJiraContent(document, projects);
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

//get and format doc into json
async function getDocs(
  conn: mysql.Connection,
  con_id: string,
  hybrid?: boolean,
  filter?: string
) {
  let query;
  if (hybrid) {
    query =
      "SELECT content, doc_id FROM contents WHERE content_id = '" +
      con_id +
      "'";
  } else {
    query =
      "SELECT content, doc_id FROM contents WHERE content_id = '" +
      con_id +
      "'";
  }

  let cont_result: any = await conn.query(query);
  let doc_id = cont_result[0][0].doc_id;
  let doc_result: any = await getProject(conn, doc_id);
  let source_id = doc_result[0].source_id;
  let source_result: any = await getSource(conn, source_id);

  const relevantDoc = {
    project_title: doc_result[0].title.replace(/["]+/g, ""),
    content: cont_result[0][0].content.replace(/["]+/g, ""),
    total_issues: doc_result[0].num_segments,
    project_status: doc_result[0].status.replace(/["]+/g, ""),
    source: source_result[0].source_type.replace(/["]+/g, ""),
  };

  return relevantDoc;
}
//utility functions
async function getContentID(conn: mysql.Connection, query: string) {
  const result = await conn.query(query);
  return result[0];
}
async function getProject(conn: mysql.Connection, doc_id: string) {
  const query =
    "SELECT title, num_segments, status, source_id FROM documents WHERE doc_id = '" +
    doc_id +
    "'";
  const result = await conn.query(query);
  return result[0];
}
async function getSource(conn: mysql.Connection, source_id: string) {
  const query =
    "SELECT source_type FROM data_source WHERE source_id = '" + source_id + "'";
  const result = await conn.query(query);
  return result[0];
}

function searchForSprint(sprints: any, target: string) {
  if (sprints.length > 0) {
    return sprints.find((sprint: any) => {
      return sprint.sprint_name == target;
    });
  }
  return false;
}

function searchForIssue(issues: any, target: string) {
  if (issues.length > 0) {
    return issues.find((issue: any) => {
      return issue.issue_title == target;
    });
  }
  return false;
}

function searchForBoard(boards: any, target: string) {
  if (boards.length > 0) {
    return boards.find((board: any) => {
      return board.board_name == target;
    });
  }
  return false;
}
function addIssue(
  boards: any,
  issue_title: string,
  issue_type: string,
  issue_description: string,
  issue_created: string,
  issue_status: string,
  board_name: string,
  sprint_name: string
) {
  const issue_info = {
    issue_title: issue_title,
    issue_type: issue_type,
    issue_desc: issue_description,
    issue_created: issue_created,
    issue_status: issue_status,
  };

  const containsBoard = searchForBoard(boards, board_name);

  // find the board it belongs to
  if (containsBoard) {
    const boardIndx = boards.indexOf(containsBoard);
    const containsSprint = searchForSprint(
      boards[boardIndx].sprints,
      sprint_name
    );

    // find the sprint it belongs to
    if (containsSprint) {
      const sprintIndex = boards[boardIndx].sprints.indexOf(containsSprint);

      const containsIssue = searchForIssue(
        boards[boardIndx].sprints[sprintIndex].issues,
        issue_title
      );

      // if the issue doesnt exist add it
      if (!containsIssue) {
        boards[boardIndx].sprints[sprintIndex].issues.push(issue_info);
      }
    }
  }
}
function addSprint(boards: any, sprint_name: string, board_name: string) {
  const sprint_info: any = {
    sprint_name: sprint_name,
  };

  sprint_info["issues"] = [];

  const containsBoard = searchForBoard(boards, board_name);

  // find the board it belongs to
  if (containsBoard) {
    const boardIndx = boards.indexOf(containsBoard);
    const containsSprint = searchForSprint(
      boards[boardIndx].sprints,
      sprint_info.sprint_name
    );

    // if sprint isn't already in the sprint array, add it
    if (!containsSprint) {
      boards[boardIndx].sprints.push(sprint_info);
    }
  }
}
function addBoard(board_name: string, boards: any) {
  // get info for board and push it into the boards array
  const board_info: any = {
    board_name: board_name,
  };

  board_info["sprints"] = [];

  // if sprint isn't already in the sprint array, add it
  const containsBoard = boards.find((board: { board_name: any }) => {
    return board.board_name === board_info.board_name;
  });

  if (!containsBoard) {
    boards.push(board_info);
  }
}
// to group jira issues by project
async function getJiraContent(document: any, projArr: any) {
  let response: any = await ContentTranslator().translate(document.content);
  const parsedContent = JSON.parse(JSON.stringify(response.data, undefined, 3)); // turn it into a JSON object
  const project_name = parsedContent.result[0].project_name;
  const project_source = document.source;
  const board_name = parsedContent.result[0].board_name;
  const sprint_name = parsedContent.result[0].sprint_name;
  const issue_title = parsedContent.result[0].issue_title;
  const issue_type = parsedContent.result[0].issue_type;
  const issue_description = parsedContent.result[0].issue_description;
  const issue_created = parsedContent.result[0].issue_created;
  const issue_status = parsedContent.result[0].issue_status;

  //add the first project
  if (projArr.length == 0) {
    projArr.push(
      makeProject(
        sprint_name,
        board_name,
        project_name,
        project_source,
        document.project_status,
        issue_title,
        issue_type,
        issue_description,
        issue_created,
        issue_status
      )
    );

    return;
  }

  //search for the project
  const containsProject: any = projArr.find(
    (project: { project_title: any }) => project.project_title === project_name
  );

  //check if project already exists, search for the board
  if (containsProject) {
    const projectIndex = projArr.indexOf(containsProject);
    const containsBoard: any = searchForBoard(
      projArr[projectIndex].project_info.boards,
      board_name
    );

    // if board already exists, search for the sprint
    if (containsBoard) {
      const boardIndx =
        projArr[projectIndex].project_info.boards.indexOf(containsBoard);

      const containsSprint: any = searchForSprint(
        projArr[projectIndex].project_info.boards[boardIndx].sprints,
        sprint_name
      );

      //if sprint already exists, add the issue
      if (containsSprint) {
        addIssue(
          projArr[projectIndex].project_info.boards,
          issue_title,
          issue_type,
          issue_description,
          issue_created,
          issue_status,
          board_name,
          sprint_name
        );
      }

      //make a new sprint
      else {
        addSprint(
          projArr[projectIndex].project_info.boards,
          sprint_name,
          board_name
        );
        addIssue(
          projArr[projectIndex].project_info.boards,
          issue_title,
          issue_type,
          issue_description,
          issue_created,
          issue_status,
          board_name,
          sprint_name
        );
      }
    }

    //board does not exist, add new board
    else {
      addBoard(board_name, projArr[projectIndex].boards);
      addSprint(
        projArr[projectIndex].project_info.boards,
        sprint_name,
        board_name
      );
      addIssue(
        projArr[projectIndex].project_info.boards,
        issue_title,
        issue_type,
        issue_description,
        issue_created,
        issue_status,
        board_name,
        sprint_name
      );
    }
  }

  //the project does not exist so create it
  else {
    projArr.push(
      makeProject(
        sprint_name,
        board_name,
        project_name,
        project_source,
        document.project_status,
        issue_title,
        issue_type,
        issue_description,
        issue_created,
        issue_status
      )
    );
  }
}

function makeProject(
  sprint_name: string,
  board_name: string,
  project_name: string,
  project_source: string,
  project_status: string,
  issue_title: string,
  issue_type: string,
  issue_description: string,
  issue_created: string,
  issue_status: string
) {
  let boards: {}[] = [];

  addBoard(board_name, boards);
  addSprint(boards, sprint_name, board_name);
  addIssue(
    boards,
    issue_title,
    issue_type,
    issue_description,
    issue_created,
    issue_status,
    board_name,
    sprint_name
  );

  const project_info = {
    project_source: project_source,
    project_status: project_status,
    boards: boards,
  };

  const project = {
    project_title: project_name,
    project_info: project_info,
  };

  return project;
}
