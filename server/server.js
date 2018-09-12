require("./config/config");

const express = require("express");
const { startServer, serveStaticFolder } = require("./init");
const path = require("path");

const app = express();
const port = process.env.PORT;
const publicFolder = path.join(__dirname, "..", "public");

serveStaticFolder(app, publicFolder);

startServer(app, port);
