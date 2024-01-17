import { connect } from "http2";
import mysql from "mysql2/promise";

const HOST = process.env.HOST;
const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;
const SQL_DATABASE = process.env.SQL_DATABASE;
const VEC_DATABASE = process.env.VEC_DATABASE;

if (!HOST || !PASSWORD || !USER) {
  throw Error("db info scuffed");
}

//this function connects to singlestoredb
export async function connectSingleStore() {
  let singleStoreConnection;
  try {
    singleStoreConnection = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: VEC_DATABASE,
    });
    return singleStoreConnection;
  } catch (err) {
    console.error("ERROR", err);

    process.exit(1);
  }
}

export async function stopSingleStore(conn: mysql.Connection) {
  await conn.end();
}

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

    const query =
      "SELECT title, text, DOT_PRODUCT_F64(JSON_ARRAY_PACK_F64('[" +
      embedding +
      "]'), content_vector) AS score FROM wikipedia ORDER BY score DESC LIMIT 1";

    const result = await conn.query(query);
    return result[0];
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}

export async function searchDatabase({
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

    //have to use escape quotes, dot_product and json_array_pack suffic (F_64) is dependent on what was used in the insert statement
    let query =
      "SELECT title, text, DOT_PRODUCT_F64(JSON_ARRAY_PACK_F64('[" +
      embedding +
      "]'), content_vector) AS score FROM wikipedia ORDER BY score DESC LIMIT 5";

    const result = await conn.query(query);
    return result[0];
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (conn) {
      await stopSingleStore(conn);
    }
  }
}
