import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const host: string = process.env.MONGO_URI!;
const client: MongoClient = new MongoClient(host);
let db: Db;

async function connectToDatabase(): Promise<Db> {
  try {
    const conn = await client.connect();
    console.log("koneksi success");
    return conn.db("pnc");
  } catch (e) {
    console.error("koneksi gagal", e);
    throw e;
  }
}

connectToDatabase()
  .then((database) => {
    db = database;
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });

export function getDb(): Db {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}

export default getDb;