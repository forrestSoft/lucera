const path = require('path')
const express = require('express')
const app = express();
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')));

const db = require('./server/db.js')

let keys
let symbols
begin = (data) => {
	keys = data.headerKeys
	symbols = data.symbolList
	
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
	'ask_quantity',
	'symbols'
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
	let q = []
	for (param in req.query){
		if(valid.includes(param)){
			let qValues = req.query[param].split(',').map((l,i)=>{
				q.push({[param]: l})
					return l	
				})
			actual[param] =  qValues
		}	
	}
	
	if(!Object.keys(actual).length){
		res.send({
			headerKeys: keys,
			symbolList: symbols,
		})	
		return
	}

	let count = req.query.count || 10
	let start = req.query.start || 0
	
	db.find({
		$where: function (){
			let matches = Object.keys(actual).some((param, i)=>{
				return actual[param].includes(this[param])
			})
			
			return matches
		}},
		(err, docs)=>{
			res.send({
				total: docs.length,
				length: count,
				data: docs,//.slice(start,count),
				headerKeys: keys,
				symbolList: symbols,
			})
		})
});