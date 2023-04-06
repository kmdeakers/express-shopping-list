"use strict";

const express = require("express");
const app = express();
const itemsRoutes = require("./itemsRoutes");

const { NotFoundError } = require("./expressError");
const { BadRequestError } = require("./expressErrors");

app.use(express.json()); // process JSON data
app.use(express.urlencoded()); // process trad form data

app.use("/items", itemsRoutes);

app.use("/items/:name", function (req, res, next) {
  //check item exists in items
  const itemName = req.params.name;
  const foundItem = items.find((item) => item.name === itemName);
  if (!foundItem)
    throw new NotFoundError(`There is no ${itemName} in your list!`);
  return next();
});

app.use("/items", function (req, res, next) {
  //check data params are valid
  if (req.body) {
    if (!req.body.name) throw new BadRequestError("Name missing!");
    if (isNaN(Number(req.body.price)))
      throw new BadRequestError("Invalid price!");
  }
  return next();
});
// ... your routes go here ...

app.use(function (req, res) {
  // handle site-wide 404s
  throw new NotFoundError();
});

app.use(function (err, req, res, next) {
  // global err handler
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
