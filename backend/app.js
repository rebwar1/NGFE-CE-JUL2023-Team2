import "dotenv/config";
import express, { json } from "express";
// import mysql from "mysql2";
import cors from "cors";
import multer, { memoryStorage } from "multer";
import { getUserPresignedUrls, uploadToS3 } from "./s3.js";
import db from "./db.js";
const app = express();

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "NGF", // Make sure this matches the username you created in MySQL
//   password: "123", // Make sure this matches the password you set for the user
//   database: "DriverCheckInDB",
// });

// db.connect(err => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL");
// });
// export { app, db };

const PORT = process.env.PORT || 4000;

const storage = memoryStorage();
const upload = multer({ storage });

app.use(
  cors({
    origin: "*",
  })
);
app.use(json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.post("/images", upload.single("image"), (req, res) => {
  const { file } = req;
  const userId = req.headers["x-user-id"];

  if (!file || !userId) return res.status(400).json({ message: "Bad request" });

  const { error, key } = uploadToS3({ file, userId });
  if (error) return res.status(500).json({ message: error.message });

  return res.status(201).json({ key });
});

app.get("/images", async (req, res) => {
  const userId = req.headers["x-user-id"];

  if (!userId) return res.status(400).json({ message: "Bad request" });

  const { error, presignedUrls } = await getUserPresignedUrls(userId);
  if (error) return res.status(400).json({ message: error.message });

  return res.json(presignedUrls);
});

app.post("/save-check-in", (req, res) => {
  const { name, familyName, email, vehicleNumber, companyName, timestamp } =
    req.body;

  // Insert the form data into the database
  const query =
    "INSERT INTO CheckIns (name, familyName, email, vehicleNumber, companyName, timestamp) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    familyName,
    email,
    vehicleNumber,
    companyName,
    timestamp,
  ];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error("Error while saving check-in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log("Check-in saved to the database");

    // Send the saved data back to the frontend
    return res.status(201).json({
      message: "Check-in saved successfully",
      savedData: {
        name,
        familyName,
        email,
        vehicleNumber,
        companyName,
        timestamp,
      },
    });
  });
});

app.get("/save-check-in", (req, res) => {
  const query = "SELECT * FROM CheckIns"; // Using the correct table name

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log("Check-ins retrieved from the database:", results);
    return res.status(200).json(results);
  });
});

app.get("/api/flag", (req, res) => {
  const query = "SELECT name_common, flag_url, language FROM country_data";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error: " + err.stack);
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

app.get("/safety/card", (req, res) => {
  db.query("SELECT * FROM construction_safety", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching data." });
    } else {
      res.json(results);
    }
  });
});

// app.get("/check-ins-with-images", async (req, res) => {
//   // Your SQL query to fetch form data and associated image keys
//   const query = `
//     SELECT CheckIns.*, Images.image_key
//     FROM CheckIns
//     LEFT JOIN Images ON CheckIns.id = Images.user_id
//   `;

//   db.query(query, (error, results) => {
//     if (error) {
//       console.error("Error querying the database:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     console.log(
//       "Check-ins with associated images retrieved from the database:",
//       results
//     );

//     // Process the results to handle null image_key values
//     const processedResults = results.map(row => ({
//       id: row.id,
//       name: row.name,
//       familyName: row.familyName,
//       email: row.email,
//       vehicleNumber: row.vehicleNumber,
//       companyName: row.companyName,
//       timestamp: row.timestamp,
//       // Check if image_key is null or not and provide a default value if needed
//       image_key: row.image_key || "default_image_key",
//     }));

//     return res.status(200).json(processedResults);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
