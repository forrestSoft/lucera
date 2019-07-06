const csvFilePath = "./bdata.csv"
const csvToJson=require('csvtojson')
const Datastore = require('nedb')

let db = new Datastore();

csvToJson()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
	    fill(jsonObj)
	})

// TODO - this is a stupid way to get the data
fill = (data) => {
	let symbols = new Set()
	db.insert(data, (err, newDocs)=>{
		// walk over every row to build array of unique
		// symbols
		let s = newDocs.forEach((doc,i)=>{
			// db.update({ _id: doc._id }, { $set: { ts: new Date(doc.ts).getMonth() } }, 
			// 	{ multi: true },
			// 	function (err, numReplaced) {})

			symbols.add(doc.sym)
		})

		// send along column headers and unique symbols
		begin({
			headerKeys: Object.keys(newDocs[0]),
			symbolList: Array.from(symbols)
		})
	})
}

module.exports = db