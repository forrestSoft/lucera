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
	let symbols = {}
	db.insert(data, (err, newDocs)=>{
		// walk over every row to build array of unique
		// symbols
		let s = newDocs.forEach((doc,i)=>{
			if(!symbols[doc.sym]){
				symbols[doc.sym] = true
			}
		})

		// send along column headers and unique symbols
		begin({
			headerKeys: Object.keys(newDocs[0]),
			symbolList: symbols
		})
	})
}

module.exports = db