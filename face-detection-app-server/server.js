const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors());
const database = {
	users:[
		{
			id:'123',
			name:'John',
			password:'cookies',
			email:'john@gmail.com',
			entries:0,
			joined: new Date()
		},
		{
			id:'321',
			name:'Sally',
			password:'bananas',
			entries:0,
			joined: new Date()
		},
    ]
}

app.get('/', (req, res)=> {
	return res.send(database.users);
})


app.post('/signin', (req,res) => {
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
		return res.json(database.users[0]);
	}else {
		return res.status(400),res.json('wrong email or password')
	};
})

app.post('/register', (req,res) => {
	const {email, name, password} = req.body;
	database.users.push({
		id:'125',
		name:name,
		entries:0,
		joined: new Date()
	})
	return res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
	const{id} = req.params;
	let found = false;
	database.users.forEach(data => {
		if (data.id === id) {
			found = true;
			return res.json(data);
		}
	})
	if (!found){
		return res.status(400).json('not found');
	}
})

app.put('/image', (req,res) => {
	const{id} = req.body;
	let found = false;
	database.users.forEach(data => {
		if (data.id === id) {
			found = true;
			data.entries++
			return res.json(data.entries);
		}
	})
	if (!found){
		return res.status(400).json('not found');
	}
})

app.listen(3000, ()=> {
	console.log('app is running');
})

