const express = require("express");

const actionRouter = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");

const server = express();

server.use(express.json());
server.use("./api/actions", actionRouter);
server.use("./api/projects", projectRouter);

module.exports = server;