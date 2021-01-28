const { STRING } = require("sequelize");
const S= require("sequelize");
const db= require("../db")
const Op = S.Op

class Page extends S.Model {}

Page.init({

    title: {
        type: S.STRING,
        allowNull: false
      },
      urltitle: {
        type: S.STRING,
      },
      route: {
        type: S.VIRTUAL,
        get() {
          return `/wiki/${this.urltitle}`;
        }
        },
      content: {
        type: S.TEXT,
        allowNull: false
      },
      status: {
        type: S.ENUM('open', 'closed'), 
      },
      tags: {
        type: S.ARRAY(S.STRING)
      }
}, { sequelize: db, modelName: 'page' })//ACORDARSE SIEMPRE SEGUNDO PARAMETRO. CONECTA CON DB


Page.addHook('beforeValidate', function(page) {
  if (page.title) {
    page.urltitle = page.title.replace(/\s/g, '_').replace(/\W/g, '');
  } else {
    page.urltitle = Math.random()
      .toString(36)
      .substring(2, 7);
  }
})

Page.findByTag= function(parametro){
  return Page.findAll({
    where : {
        tags: {
            [Op.overlap]: parametro
        }
    }    
})
}

Page.prototype.findSimilar= function(parametro){
   return Page.findOne({
    where: {
        urltitle: parametro
    }})
    .then(pages=>{
      return Page.findAll({
        where : {
            tags: {
                [Op.overlap]: pages.tags
            },
            urltitle: {
              [Op.ne]: pages.urltitle
            }
        }    
    })
    }
  )
}













module.exports= Page