"use strict"

const express = require("express");

const db = require("./fakeDb");
const { BadRequestError, NotFoundError } = require("./expressErrors");
const { it } = require("node:test");
const router = new express.Router();



router.get("/", function (req, res) {

    return res.json( { items } );
});

router.post("/", function (req, res) {
    if (req.body.name && !isNaN(Number(req.body.price))) {
    items.push(req.body); 
    } else {
        throw new BadRequestError("Invalid Input");
    };
    return res.json( {added: req.body})
})

router.get("/:name", req, res) {
    const itemName = req.params.name;
    const foundItem = items.find(item => 
         item.name === itemName);
    if (foundItem) {     
    return res.json(foundItem)
    } else {
        throw new NotFoundError("The item you requested does not exist")
    }
}