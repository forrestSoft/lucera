const csvFilePath = "./bdata.csv"
const csvToJson=require('csvtojson')
const Datastore = require('nedb')

let db = new Datastore();

let data
let csv = csvToJson()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    data = jsonObj
    fill(data)
})

fill = (data) => {
	db.insert(data, (newDocs)=>{
		// console.log(db.getAllData())
		begin()
	})
}

module.exports = db