const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const Datastore = require('nedb')

const csvFilePath = "./adata.csv"
// const csvToJson = require('convert-csv-to-json');
// let data = csvToJson.getJsonFromCsv("./adata.csv")

const csvToJson=require('csvtojson')
let db = new Datastore();

let data
let csv = csvToJson()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    data = jsonObj.slice(0,3)
    fill(data)

})

fill = (data) => {
	db.insert(data, (newDocs)=>{
		begin()
	})
}

begin = () => {
	// console.log that your server is up and running
	app.listen(port, () => console.log(`Listening on port ${port}`));
	db.find({"lp": 'LP1'} , (error, newDocs)=>{
			console.log(newDocs)
		})
}


// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});