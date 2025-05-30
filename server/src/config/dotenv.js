import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const requireEnv = [
  "PORT",
  "DB_URL",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
];

requireEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Warning: Missing environment variable "${key}"`);
  }
});
