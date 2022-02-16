const express = require("express");
const db = require("./fakeDb");

const router = express.Router();

router.get("/", function (req, res) {
    return res.json(db.items);
});

router.post("/", function (req,res){
    let newItem = { name: req.params.name, price: req.params.price};
    db.items.push(newItem);
    return res.json({ added: newItem});
});


module.exports = router;

