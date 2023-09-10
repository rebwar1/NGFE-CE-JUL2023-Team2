import express from "express";
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

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "dfsf94835asdauysf65",
    resave: true,
    saveUninitialized: true,
  })
);

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
    // console.log("result🍇:" + results.body);
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
  console.log("🍇", request);
});

app.get("/success", (request, response) => {
  response.send("Success");
});
// https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=56949c87-4fae-4c91-893c-d512df949d24&redirect_uri=http://localhost:8000/

app.listen(8000, () => {
  console.log(" Rebwar server has started", process.env.USER_ID);
});

//🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇
