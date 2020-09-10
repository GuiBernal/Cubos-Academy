const fs = require("fs");
const csvParser = require("csv-parser");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const cerveja = () => {
    const stream = fs.createReadStream("beers.csv")
    let cerveja = [];

    stream.pipe(csvParser()).on("data", (varData) => {
        cerveja.push({
            id: Number(cerveja.length + 1),
            abv: Number(varData["abv"]),
            ibu: Number(varData["ibu"]),
            national_id: Number(varData["national_id"]),
            name: varData["name"].replace('"',"").replace("'","").replace("´","").trim(),
            style: varData["style"].replace('"',"").replace("'","").replace("´","").trim(),
            brewery_id: Number(varData["brewery_id"]),
            ounces: Number(varData["ounces"]),
        });
    });

    stream.on("end", () => {
        const csvWriter = createCsvWriter({
            path: 'cervejas_out.csv',
            header: [
                {id: 'id', title: 'id'},
                {id: 'abv', title: 'abv'},
                {id: 'ibu', title: 'ibu'},
                {id: 'national_id', title: 'id_nacional'},
                {id: 'name', title: 'nome'},
                {id: 'style', title: 'estilo'},
                {id: 'brewery_id', title: 'id_cervejaria'},
                {id: 'ounces', title: 'oncas'}
            ]
            });
            csvWriter.writeRecords(cerveja);
    });
}

const cerverjarias = () => {
    const stream = fs.createReadStream("breweries.csv")
    let cervejarias = [];

    stream.pipe(csvParser()).on("data", (varData) => {
        cervejarias.push({
            id: Number(cervejarias.length + 1),
            name: varData["name"].replace('"',"").replace("'","").replace("´","").trim(),
            city: varData["city"].replace('"',"").replace("'","").replace("´","").trim(),
            state: varData["state"].trim()
        });
    });

    stream.on("end", () => {
        const csvWriter = createCsvWriter({
            path: 'cervejarias_out.csv',
            header: [
                {id: 'id', title: 'id'},
                {id: 'name', title: 'nome'},
                {id: 'city', title: 'cidade'},
                {id: 'state', title: 'estado'}
            ]
            });
            csvWriter.writeRecords(cervejarias);
    });
}

cerveja();
cerverjarias();