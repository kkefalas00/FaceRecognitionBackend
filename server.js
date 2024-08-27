const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const route = require('./controllers/route');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const PORT = 3000;

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,// PostgreSQL default port
      user: 'postgres',
      password: 'k@n_kef1990',
      database: 'smart-brain',
    },
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


//ROUTE
app.get('/',(req,res)=>{route.getUsers(req,res,db)});

//SIGNIN
app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)});

//REGISTER
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)});

//PROFILE
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

//PUT
app.put('/image',(req,res)=>{image.handleImageCount(req,res,db)});

app.listen(PORT,()=>{
    console.log("Web Server -- Express.js is running on port 3000");
})