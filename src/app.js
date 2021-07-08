const express = require("express");
const socketio = require("socket.io");
require("dotenv").config();
require("./database");
const http = require("http");
const path = require("path");

const cors = require("cors");
const { errors } = require("celebrate");

const app = express();

app.use(cors());

const routes = require("./routes");

const { createConnection } = require("./controllers/socket");
app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use(express.json());


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
