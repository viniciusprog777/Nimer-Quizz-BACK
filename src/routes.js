const express = require("express");

const routes = express();

const index = (req, res) => {
    return res.send("foi")
}
const index2 = (req, res) => {
    return res.send("foi de novo ")
}
routes.get("/", index);

routes.get("/teste", index2);

module.exports = routes;