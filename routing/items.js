"use strict";

const express = require("express");
const db = require("../fakeDb");

const router = express.Router();

/** get all items */
router.get("/", function (req, res) {
    return res.json({ items: db.items });
});

/** add item */
router.post("/", function (req, res) {
    //This is a good line for security, unpack things you expect, not things you dont
    const newItem = { name: req.body.name, price: req.body.price };
    db.items.push(newItem);

    return res.json({ added: newItem });
});

/** get :name item */
router.get("/:name", function (req, res) {
    const fetchedItem = db.items.find(
        element => element.name === req.params.name
    );

    return res.json(fetchedItem);
});

/** update item in shopping list */
router.patch("/:name", function (req, res) {
    const fetchedItem = db.items.find(
        element => element.name === req.params.name
    );

    //conditional for exact keys you want
    for (key in req.body) {
        fetchedItem[key] = req.body[key];
    }

    return res.json({ updated: fetchedItem });
});

/** delete item from shopping list */
router.delete("/:name", function (req, res) {
    db.items = db.items.filter(element => element.name != req.params.name);
    return res.json({ message: "Deleted" });
})

module.exports = router;

