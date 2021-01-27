const express = require( 'express' );
const morgan = require('morgan'); 
const bodyParser= require("body-parser")
const nunjucks= require("nunjucks");
const sequelize = require('./db')
const routes= require ("./routes")


const app = express();

//Configuracion nunjucks
var env = nunjucks.configure('views', {noCache: true});
// hace res.render funcionar con archivos html
app.set('view engine', 'html');
// cuando res.render funciona con archivos html, haz que use nunjucks para eso.
app.engine('html', nunjucks.render);

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//STATIC
app.use(express.static('./public'))
//Loggin middleware
app.use(morgan('tiny'))

app.use("/", routes)


//Levantando el servidor
sequelize.sync()
    .then(function(){
        console.log("Conectado a la base de datos")

        app.listen(3000, function(){
            console.log('Estas escuhando en el puerto 3000')
        });
    })
