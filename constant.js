require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.POSTGRES_PORT;
const DB_USERNAME = process.env.POSTGRES_USER;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
const DB_HOST = process.env.POSTGRES_HOST;
const DB_NAME = process.env.POSTGRES_DB_NAME;
const DB_URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=no-verify`;
console.log(DB_URI)
module.exports = {
  PORT,
  DB_URI,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT,
};
