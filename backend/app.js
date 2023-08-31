import "dotenv/config";
import express, { json } from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer, { memoryStorage } from "multer";
import { getUserPresignedUrls, uploadToS3 } from "./s3.js";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "azad4582",
  database: "DriverCheckInDB",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("azad4582"),
  },
});

const PORT = process.env.PORT || 4000;

const storage = memoryStorage();
const upload = multer({ storage });

app.use(
  cors({
    origin: "*",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: true,
  })
);
app.use(json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.get("/check-ins", (req, res) => {
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

//TODO Serve static files from the React app
/**
 * ! const _dirname = path.dirname("");
 *! const buildPath = path.join(_dirname, "../frontend/build");
 *! app.use(express.static(buildPath));
 */

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const buildPath = path.join(__dirname, "../frontend/build");

// app.use(express.static(buildPath));

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../frontend/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });
//TODO end of Serve static files from the React app

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//🍉