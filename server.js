const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


const db = require('./server/db.js')

begin = () => {
	app.listen(port, () => console.log(`Listening on port ${port}`));
}

const valid = [
	'sym',
	'ts',
	'lp',
	'bid_price',
	'bid_quantity',
	'ask_price',
	'ask_quantity'
]

app.get('/query', (req, res) => {
	// filter out invalid params
	let actual = {}
	for (param in req.query){
		if(valid.includes(param)){
			actual[param] =  req.query[param]
		}
	}

	let count = req.query.count || 10
	let start = req.query.start || 0

	// execute a search with the valid params that were sent
	db.find({...actual} , (error, newDocs)=>{
		console.log(newDocs)
		res.send({
			total: newDocs.length,
			length: count,
			data: newDocs.slice(start,count)
		})
	})
  
});