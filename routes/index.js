const express = require('express');
const router = express.Router();
const users= require("./user")
const wiki= require("./wiki")

const { User, Page } = require('../models');


//////////////////////
router.use("/users", users)
router.use("/wiki", wiki)
router.get("/", function(req, res){
    res.redirect("/wiki")
})





///////////////////////77
module.exports = router;