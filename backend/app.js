// import "dotenv/config";
// import express, { json } from "express";
// // import mysql from "mysql2";
// import cors from "cors";
// import multer, { memoryStorage } from "multer";
// import { getUserPresignedUrls, uploadToS3 } from "./s3.js";
// import db from "./db.js";
// const app = express();

// // const db = mysql.createConnection({
// //   host: "localhost",
// //   user: "NGF", // Make sure this matches the username you created in MySQL
// //   password: "123", // Make sure this matches the password you set for the user
// //   database: "DriverCheckInDB",
// // });

// // db.connect(err => {
// //   if (err) {
// //     console.error("Error connecting to MySQL:", err);
// //     return;
// //   }
// //   console.log("Connected to MySQL");
// // });
// // export { app, db };

// const PORT = process.env.PORT || 8000;

// const storage = memoryStorage();
// const upload = multer({ storage });

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(json());

// app.get("/", (req, res) => {
//   res.json("Hello World!");
// });

// app.post("/images", upload.single("image"), (req, res) => {
//   const { file } = req;
//   const userId = req.headers["x-user-id"];

//   if (!file || !userId) return res.status(400).json({ message: "Bad request" });

//   const { error, key } = uploadToS3({ file, userId });
//   if (error) return res.status(500).json({ message: error.message });

//   return res.status(201).json({ key });
// });

// app.get("/images", async (req, res) => {
//   const userId = req.headers["x-user-id"];

//   if (!userId) return res.status(400).json({ message: "Bad request" });

//   const { error, presignedUrls } = await getUserPresignedUrls(userId);
//   if (error) return res.status(400).json({ message: error.message });

//   return res.json(presignedUrls);
// });

// app.post("/save-check-in", (req, res) => {
//   const { name, familyName, email, vehicleNumber, companyName, timestamp } =
//     req.body;

//   // Insert the form data into the database
//   const query =
//     "INSERT INTO CheckIns (name, familyName, email, vehicleNumber, companyName, timestamp) VALUES (?, ?, ?, ?, ?, ?)";
//   const values = [
//     name,
//     familyName,
//     email,
//     vehicleNumber,
//     companyName,
//     timestamp,
//   ];

//   db.query(query, values, (error, result) => {
//     if (error) {
//       console.error("Error while saving check-in:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     console.log("Check-in saved to the database");

//     // Send the saved data back to the frontend
//     return res.status(201).json({
//       message: "Check-in saved successfully",
//       savedData: {
//         name,
//         familyName,
//         email,
//         vehicleNumber,
//         companyName,
//         timestamp,
//       },
//     });
//   });
// });

// app.get("/save-check-in", (req, res) => {
//   const query = "SELECT * FROM CheckIns"; // Using the correct table name

//   db.query(query, (error, results) => {
//     if (error) {
//       console.error("Error querying the database:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     console.log("Check-ins retrieved from the database:", results);
//     return res.status(200).json(results);
//   });
// });

// app.get("/api/flag", (req, res) => {
//   const query = "SELECT name_common, flag_url, language FROM country_data";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Database query error: " + err.stack);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(results);
//   });
// });

// app.get("/safety/card", (req, res) => {
//   db.query("SELECT * FROM construction_safety", (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "An error occurred while fetching data." });
//     } else {
//       res.json(results);
//     }
//   });
// });
// //account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=56949c87-4fae-4c91-893c-d512df949d24&redirect_uri=http://localhost:8000/

// https: app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
//🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉
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
//! const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Include cookies when sending requests
//  };
//! app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

const storage = memoryStorage();
const upload = multer({ storage });

app.use(
  cors({
    origin: "*",
  })
);
app.use(json());

//🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒

import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import docusign from "docusign-esign"; // Use CommonJS-style import
import fs from "fs";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "dfsf94835asdauysf65",
    resave: true,
    saveUninitialized: true,
  })
);

//🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒

// app.get("/", (req, res) => {
//   res.json("Hello World!");
// });

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

    //! console.log("Check-ins retrieved from the database:", results);
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

//🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧
// app.post("/signature", async (request, response) => {
//   // const { name, email, company } = request.body;
//   // console.log("Received data from the client:");
//   // console.log("Name:", name);
//   // console.log("Email:", email);
//   // console.log("Company Name:", company);

//   // // You can also send the data back to the React app if needed.
//   // return response.status(200).json({
//   //   name,
//   //   email,
//   //   company,
//   //   message: "Data received successfully",
//   // });
//   console.log("🍇", request);
//   await checkToken(request);
//   let envelopesApi = getEnvelopesApi(request);
//   let envelope = makeEnvelope(
//     request.body.name,
//     request.body.email,
//     request.body.company
//   );

//   let results = await envelopesApi.createEnvelope(process.env.ACCOUNT_ID, {
//     envelopeDefinition: envelope,
//   });
//   // console.log("envelope results ", results);
//   // Create the recipient view, the Signing Ceremony
//   let viewRequest = makeRecipientViewRequest(
//     request.body.name,
//     request.body.email
//   );
//   results = await envelopesApi.createRecipientView(
//     process.env.ACCOUNT_ID,
//     results.envelopeId,
//     {
//       recipientViewRequest: viewRequest,
//     }
//   );

//   response.redirect(results.url);
// });

async function checkToken(request) {
  if (request.session.access_token && Date.now() < request.session.expires_at) {
    // console.log("re-using access_token ", request.session.access_token);
  } else {
    // console.log("generating a new access token");
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.BASE_PATH);
    const results = await dsApiClient.requestJWTUserToken(
      process.env.INTEGRATION_KEY,
      process.env.USER_ID,
      "signature",
      fs.readFileSync(path.join(__dirname, "private.key")),
      3600
    );

    request.session.access_token = results.body.access_token;
    request.session.expires_at =
      Date.now() + (results.body.expires_in - 60) * 1000;
  }
}

app.post("/form", async (request, response) => {
  await checkToken(request);
  let envelopesApi = getEnvelopesApi(request);
  let envelope = makeEnvelope(
    request.body.name,
    request.body.email,
    request.body.company
  );

  let results = await envelopesApi.createEnvelope(process.env.ACCOUNT_ID, {
    envelopeDefinition: envelope,
  });
  // console.log("envelope results ", results);
  // Create the recipient view, the Signing Ceremony
  let viewRequest = makeRecipientViewRequest(
    request.body.name,
    request.body.email
  );
  results = await envelopesApi.createRecipientView(
    process.env.ACCOUNT_ID,
    results.envelopeId,
    {
      recipientViewRequest: viewRequest,
    }
  );

  response.redirect(results.url);
});

function getEnvelopesApi(request) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(process.env.BASE_PATH);
  dsApiClient.addDefaultHeader(
    "Authorization",
    "Bearer " + request.session.access_token
  );
  return new docusign.EnvelopesApi(dsApiClient);
}

function makeEnvelope(name, email, company) {
  let env = new docusign.EnvelopeDefinition();
  env.templateId = process.env.TEMPLATE_ID;
  let text = new docusign.Text.constructFromObject({
    tabLabel: "company_name",
    value: company,
  });

  // Pull together the existing and new tabs in a Tabs object:
  let tabs = new docusign.Tabs.constructFromObject({
    textTabs: [text],
  });

  let signer1 = new docusign.TemplateRole.constructFromObject({
    email: email,
    name: name,
    tabs: tabs,
    clientUserId: process.env.CLIENT_USER_ID,
    roleName: "Applicant",
  });

  env.templateRoles = [signer1];
  env.status = "sent";

  return env;
}

function makeRecipientViewRequest(name, email) {
  let viewRequest = new docusign.RecipientViewRequest();

  viewRequest.returnUrl = "http://localhost:8000/success";
  viewRequest.authenticationMethod = "none";

  // Recipient information must match embedded recipient info
  // we used to create the envelope.
  viewRequest.email = email;
  viewRequest.userName = name;
  viewRequest.clientUserId = process.env.CLIENT_USER_ID;

  return viewRequest;
}

app.get("/", async (request, response) => {
  await checkToken(request);
  response.sendFile(path.join(__dirname, "main.html"));
});

app.get("/success", (request, response) => {
  response.sendFile(path.join(__dirname, "redirect.html"));
});

// https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=56949c87-4fae-4c91-893c-d512df949d24&redirect_uri=http://localhost:8000/

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
//🍉🍉🍉🍉🍉🍉🍉
