const { STRING } = require("sequelize");
const S= require("sequelize");
const db= require("../db")

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















module.exports= Page