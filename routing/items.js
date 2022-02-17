const express = require("express");
const db = require("./fakeDb");

const router = express.Router();

/** get all items */
router.get("/", function (req, res) {
    return res.json(db.items);
});

/** add item */
router.post("/", function (req,res){
    const newItem = { name: req.params.name, price: req.params.price};
    //db.items.push(newItem);
    db.items[newItem.name] = newItem;
    return res.json({ added: newItem});
});

/** get :name item */
router.get("/:name", function (req, res){
    const fetchedItem = db.items[req.params.name];

    return res.json(fetchedItem);
});

/** update item in shopping list */
router.patch("/:name", function(req, res){
    const fetchedItem = db.items[req.params.name];

    for(key in req.params){
        fetchedItem[key] = req.params[key];
    }

    return res.json({updated: fetchedItem});
});

/** delete item from shopping list */
router.delete("/:name", function(req,res){
    db.items = db.items.filter(element => element.name != req.params.name);
    return res.json({message: "Deleted"});
})

module.exports = router;

