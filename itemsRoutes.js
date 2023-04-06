"use strict";

const express = require("express");


const db = require("./fakeDb");
const { BadRequestError, NotFoundError } = require("./expressErrors");

const router = new express.Router();

function findItemInItems(input) {
  const foundItem = items.find((item) => item.name === input);
  if (!foundItem)
    throw new NotFoundError(`There is no ${input} in your list!`);
  return foundItem;
}

function validatePrice(price) {
  if (isNaN(Number(price)) || Number(price) < 0)
    throw new BadRequestError("Invalid price!");

  return Number(price);
}

/** returns all items :
  { items: [
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.40 }
    ]}
*/
router.get("/", function (req, res) {
  if (items.length > 0) return res.json({ items });

  throw new NotFoundError("There are no items!");
});

/**adds item to items:
 * {name: "popsicle", price: 1.45} =>
  {added: {name: "popsicle", price: 1.45}}
 */
router.post("/", function (req, res) {
  if (!req.body.name) throw new BadRequestError("Name missing!");
  const itemPrice = validatePrice(req.body.price);

  const newItem = { name: req.body.name, price: itemPrice };
  items.push(newItem);

  return res.json({ added: newItem });
});

/** returns single item:
 * {name: "popsicle", "price": 1.45}
 */
router.get("/:name", function (req, res) {
  const item = findItemInItems(req.params.name);

  return res.json(item);
});

/** modifys item properties:
 * {name: "new popsicle", price: 2.45} =>
  {updated: {name: "new popsicle", price: 2.45}}
 */
router.patch("/:name", function (req, res) {
  const item = findItemInItems(req.params.name);
  item.name = req.body.name || item.name;
  item.price = validatePrice(req.body.price) || item.price;


  return res.json({ updated: item });
});

router.delete("/:name", function (req, res) {
  for (const item of items){
    if (item.name === req.params.name){
        items.splice(items.indexOf(item), 1);
    }
  }
  return res.json( {message: "deleted"})
});

// module.exports = itemsRoutes 