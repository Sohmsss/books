import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      await db.connect();
      console.log('Connected to PostgreSQL database');
      break;
    } catch (err) {
      console.log(`Failed to connect to PostgreSQL (${retries} retries left)`);
      retries -= 1;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

export { db, connectWithRetry };
