import AWS from "aws-sdk";

// AWS.config.update({
//   region: "your-region",
//   credentials: new AWS.Credentials("your-access-key", "your-secret-key"),
// });

AWS.config.update({
  region: "eu-west-2",
  credentials: new AWS.Credentials(
    "AKIA4MTWLMO2GNEKG35R",
    "jhx/83Id39wPsFaYlwFWYTmdFJSL/wjfIQZK1O0k"
  ),
});
// AWS.config.update({
//   region: "eu-west-2",
// });

export default AWS;
