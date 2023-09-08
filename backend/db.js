// db.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "NGF",
  password: "123",
  database: "DriverCheckInDB",
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

export default db;
