require("./config/config");

const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const shellParser = require("./shellParser");
const { startServer, serveStaticFolder } = require("./init");
const path = require("path");

const app = express();
const port = process.env.PORT;
const publicFolder = path.join(__dirname, "..", "public");
const reposFolder = path.join(__dirname, "..", "test");

app.use(bodyParser.json());

app.post("/repos", (req, res) => {
  const repositoryName = req.body.name;
  exec(
    `git init "${repositoryName}.git" --bare`,
    { cwd: reposFolder },
    (error, stdout, stderr) => {
      res.send({ resp: { error: error, stdout: stdout, stderr: stderr } });
    }
  );
});

app.get("/repos/:repoName", (req, res) => {
  const repositoryName = req.params.repoName;

  exec(
    `git ls-tree HEAD`,
    { cwd: path.join(reposFolder, repositoryName) },
    (error, stdout, stderr) => {
      res.send({
        resp: {
          error: error,
          stdout: stdout,
          parsedStdOut: shellParser(stdout, {
            undefined,
            type: "",
            id: "",
            name: ""
          }),
          stderr: stderr
        }
      });
    }
  );
});

app.get("/repos/:repoName/:tree", (req, res) => {
  const repositoryName = req.params.repoName;
  const tree = req.params.tree;

  exec(
    `git ls-tree ${tree}`,
    { cwd: path.join(reposFolder, repositoryName) },
    (error, stdout, stderr) => {
      res.send({
        resp: {
          error: error,
          stdout: stdout,
          parsedStdOut: shellParser(stdout, {
            undefined,
            type: "",
            id: "",
            name: ""
          }),
          stderr: stderr
        }
      });
    }
  );
});

serveStaticFolder(app, publicFolder);

startServer(app, port);
