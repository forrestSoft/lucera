const path = require('path')
const express = require('express')
const app = express();
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')));

const db = require('./server/db.js')

let keys
let symbols
begin = ({headerKeys, symbolList}) => {
	keys = headerKeys
	symbols = symbolList
	console.log(symbolList)
	app.listen(port, () => console.log(`Listening on port ${port}`));
}

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const valid = [
	'sym',
	'ts',
	'lp',
	'bid_price',
	'bid_quantity',
	'ask_price',
	'ask_quantity'
]

app.get('/meta', (req, res)=>{
	console.log(symbols,keys)
	res.send({
		symbolList: symbols,
		headerKeys: keys
	})
})

app.get('/query', (req, res) => {
	// filter out invalid params
	let actual = {}
	for (param in req.query){
		if(valid.includes(param)){
			actual[param] =  req.query[param]
		}
	}
	
	actual['sym'] = actual['sym'] || 'EUR/AUD'

	let count = req.query.count || 10
	let start = req.query.start || 0

	// execute a search with the valid params that were sent
	db.find({...actual} , (error, newDocs)=>{
		res.send({
			total: newDocs.length,
			length: count,
			data: newDocs.slice(start,count),
			headerKeys: keys
		})
	})
});