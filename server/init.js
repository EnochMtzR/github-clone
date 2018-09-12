const express = require("express");
const path = require("path");
const fs = require("fs");
const spdy = require("spdy");

const serveGzip = app => {
  app.get("*.js", (req, res, next) => {
    req.url = req.url + ".gz";
    console.log(req.url);
    res.set("Content-Encoding", "gzip");
    next();
  });
};

const startServer = (app, port) => {
  const options = {
    key: fs.readFileSync(path.join(__dirname, "..", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "..", "/server.crt"))
  };

  serveGzip(app);

  spdy.createServer(options, app).listen(port, error => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log("Listening on port: " + port + ".");
    }
  });
};

const serveStaticFolder = (app, folder) => {
  app.use(express.static(folder));

  app.get("*", (req, res) => {
    res.sendFile(path.join(folder, "index.html"));
  });
};

module.exports = { startServer, serveStaticFolder };
