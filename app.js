const express = require("express");

const itemRoute = require("./routing/items.js");

const app = express();

app.use(express.json());
app.use("/items", itemRoute);







module.exports = app;


