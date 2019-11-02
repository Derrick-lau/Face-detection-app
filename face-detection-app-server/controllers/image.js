const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '2eaa56152d1a4d9aa64c4462e00b905c'
  });

const handleApi = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.inputurl)
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.status(400).json('unable to work with API')
	})
}

 const handleImage = (req, db, res) => {
    const{id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(400).json('ERROR'));
}

module.exports = {
  handleImage: handleImage,
  handleApi:handleApi
}