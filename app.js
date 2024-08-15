const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const db = require('./data/database');
const sessionConfig = require('./config/session')

const authRoutes = require('./route/auth.route');
const productRoutes = require('./route/product.route');
const errorHandulingMiddleware = require('./middlewares/error-handuling')
const csrfToken = require('./middlewares/csrfToken');
const checkLoginStatus = require('./middlewares/checkLogin')

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:false}));
app.use(express.static('static'));
app.use(express.static('storage'));

app.use(session(sessionConfig()))

app.use(csrf());
app.use(csrfToken);
app.use(checkLoginStatus);


app.use(authRoutes);
app.use(productRoutes);



app.use(errorHandulingMiddleware);

db.connectToDatabase().then(
    function(){
        app.listen('3000', function(){
            console.log('connected successfully....');
        })
    }
).catch(function(error){
    console.log(error);
    console.log('couldn\'t connect to database');
});

