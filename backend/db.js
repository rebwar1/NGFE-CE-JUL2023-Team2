// db.js
import mysql from "mysql2";

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "NGF",
//   password: "123",
//   database: "DriverCheckInDB",
// });
const db = mysql.createConnection({
  host: "ngf-identifier.cpyiq0oue1qz.eu-west-2.rds.amazonaws.com", // Replace with your RDS endpoint or IP address
  user: "user1",
  password: "azad4582",
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
