import AWS from "aws-sdk";

// AWS.config.update({
//   region: "your-region",
//   credentials: new AWS.Credentials("your-access-key", "your-secret-key"),
// });
// ⭐️

// ⭐️

// AWS.config.update({
//   region: "eu-west-2",
// });

export default AWS;

// import AWS from "aws-sdk";

// // The environment variable AWS_SDK_LOAD_CONFIG is set to 1 to ensure config is loaded from the config file.
// process.env.AWS_SDK_LOAD_CONFIG = "1";

// // Configure the AWS SDK with the desired region.
// AWS.config.update({
//   region: "eu-west-2",
// });

// // Now you can use the AWS SDK with credentials from the .aws/credentials file
// export default AWS;
