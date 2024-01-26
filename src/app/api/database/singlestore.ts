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

//finds relevant documents to the user query in the database
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
    const res: any = await getContentID(conn, embedding);
    const con_id: string = res[0].content_id;

    const query =
      "SELECT content, doc_id FROM contents WHERE content_id = '" +
      con_id +
      "'";

    const cont_result: any = await conn.query(query);
    const doc_id = cont_result[0][0].doc_id;
    const doc_result: any = await getProject(conn, doc_id);
    const source_id = doc_result[0].source_id;
    const source_result: any = await getSource(conn, source_id);

    const relevantDoc = {
      project_title: doc_result[0].title,
      content: cont_result[0][0].content,
      total_issues: doc_result[0].num_segments,
      project_status: doc_result[0].status,
      source: source_result[0].source_type,
    };
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

//

async function getContentID(conn: mysql.Connection, embedding: any) {
  const query =
    "SELECT content_id, DOT_PRODUCT_F64(JSON_ARRAY_PACK_F64('[" +
    embedding +
    "]'), embedding) AS score FROM embeddings_table ORDER BY score DESC LIMIT 1";

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

//export async function searchDatabase({
//   conn,
//   embedding,
// }: {
//   conn?: mysql.Connection;
//   embedding: any;
// }) {
//   try {
//     if (!conn) {
//       conn = await connectSingleStore();
//     }

//   return result[0];
//   } catch (error) {
//     console.log(error);
//     return error;
//   } finally {
//     if (conn) {
//       await stopSingleStore(conn);
//     }
//   }
// }
