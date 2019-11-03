const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const app = express();
app.use(cors())
app.use(bodyParser.json());

const db = knex({
  client: 'pg',
  connection: {
    connectionString : 'process.env.DATABASE_URL',
    ssl:true
  }
});

app.get('/', (req, res)=> {return res.send("db.users")});
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req,res) => { profile.handleProfile(req, db, res) });
app.put('/image', (req,res) => { image.handleImage(req, db, res) });
app.post('/imageUrl', (req,res) => { image.handleApi(req, res) });

const PORT = process.env.PORT
app.listen(PORT || 3000, ()=> {
	console.log(`app is running on ${PORT}`);
})


