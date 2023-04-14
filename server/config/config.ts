import dotenv from "dotenv";
dotenv.config();

const MONGODB_USERNAME = process.env.MONGODB_USERNAME || "";
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.hudvu2g.mongodb.net/`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

export const config = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};