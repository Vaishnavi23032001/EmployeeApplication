const Parse = require("parse/node");
const { ParseServer } = require("parse-server");


const parseServer = new ParseServer({
  databaseURI: process.env.MONGODB_URI,
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.PARSE_MASTER_KEY,
  serverURL: process.env.PARSE_SERVER_URL
});
Parse.initialize(
    process.env.PARSE_APP_ID,
    undefined,
    process.env.PARSE_MASTER_KEY
);

Parse.serverURL = process.env.PARSE_SERVER_URL;

module.exports = { parseServer , Parse};
