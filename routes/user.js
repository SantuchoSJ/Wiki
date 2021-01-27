const express = require('express');
const { Page } = require('../models');
const router = express.Router();
const User  = require('../models/User');


router.get("/", function(req, res){
    User.findAll()
    .then(users=>{
        res.render("users",  { users: [...users] })
    }
    )
})

router.get("/:id", function(req, res){
    let id= req.params.id
    let promesaUsuario= User.findByPk(id)
    let promesaPaginas= Page.findAll({where: {authorId: req.params.id}
      })
    Promise.all([promesaUsuario, promesaPaginas])
    .then(valores =>{
        let user= valores[0]
        let pages= valores[1]
        res.render("user", {user, pages})
    })
})


module.exports=router