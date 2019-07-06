const csvFilePath = "./bdata.csv"
const csvToJson=require('csvtojson')
const Datastore = require('nedb')

let db = new Datastore();

let symbols = new Set()
let lps = new Set()
csvToJson()
	.fromFile(csvFilePath)
	.subscribe((jsonObj,index)=>{
		// 2018-12-06T 13:00:00.119Z
    // jsonObj.ts = /\d{2}:\d{2}:\d{2}\.\d{3}/.exec(jsonObj.ts)[0]
		console.log(index, jsonObj)
    symbols.add(jsonObj.sym)
	})
	.then((jsonObj)=>{
	    fill(jsonObj)
	})

fill = (data) => {
	db.insert(data, (err, newDocs)=>{
		// send along column headers and unique symbols
		begin({
			headerKeys: Object.keys(newDocs[0]),
			symbolList: Array.from(symbols)
		})
	})
}

module.exports = db