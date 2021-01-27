const express = require('express');
const { User } = require('../models');
const router = express.Router();
const Page  = require('../models/Page');




router.get("/", function(req, res){
    Page.findAll()
    .then(pages=>{
        res.render("index",  { pages: [...pages] })
    }
    )
})

router.post("/", function(req, res){
    console.log(typeof(req.body.tags))
    User.findOrCreate({where: {name: req.body.name, email: req.body.email}})
    .then(usuario => {
        let autor= usuario[0]
        let pagina= Page.create({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags.split(" ")
          })
          return pagina
          .then(pagina =>{
            return pagina.setAuthor(autor)})
    })
    .then((pagina)=>{
        console.log("Pagina creada")
        pagina.save()
        .then(savedPage => {
        res.redirect(savedPage.route); // route virtual FTW
  })
    })
}) 
    
    
   



router.get("/add", function(req, res){
    res.render("addpage")
})

router.get("/:urltitle", function(req, res){
    Page.findOne({
        where: {
            urltitle: req.params.urltitle
        },
        include: [
            {model: User, as: 'author'}
        ]
    })
    .then(function (page) {
        // la instancia page va a tener una propiedad .author 
        // como un objeto user ({ name, email })
        if (page === null) {
            res.status(404).send();
        } else {
            let etiquetas= page.tags
            res.render('wikipage', {
                page: page,
                etiquetas
            });
        }
    })
})






















module.exports= router




