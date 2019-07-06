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
	'symbols',
	'page'
]

app.get('/meta', (req, res)=>{
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
		debugger
		res.send({
			headerKeys: keys,
			symbolList: symbols,
			pagination: {
					current: page || 1	
				}
		})	
		return
	}

	let pageSize = parseInt(req.query.pageSize || 10)
	let page = req.query.current || 1
	let start = (page || 1)*pageSize-pageSize
	actual.sym = !actual.sym[0].length ?  symbols : actual.sym
	
	db.find({
		$where: function (){
			let matches = Object.keys(actual).some((param, i)=>{
				switch(param){
					case 'sym':
						return actual[param].includes(this[param])
					break;
					case 'ask_price':
					case 'bid_price':
						return actual[param] < this[param]
					default:
						return true
					break;
				}
			})
			
			return matches
		}},
		(err, docs)=>{
			res.send({
				total: docs.length,
				data: docs.slice(start,start+pageSize),
				headerKeys: keys,
				symbolList: symbols,
				pagination: {
					current: page++,
					pageSize
				}
			})
		})
});