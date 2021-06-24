const express = require("express");
const socketio = require("socket.io");
const { errors } = require("celebrate");
require("./database");
const http = require("http");
const path = require("path");

const cors = require("cors");
const app = express();

const routes = require("./routes");
const { createConnection } = require("./controllers/socket");

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errors());

const httpServer = http.createServer(app);

const io = new socketio.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

createConnection(io);

module.exports = { httpServer, io };
