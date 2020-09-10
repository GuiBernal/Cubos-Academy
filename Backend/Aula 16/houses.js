const fs = require("fs");
const csvParser = require("csv-parser");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const stream = fs.createReadStream("houses.csv");
let conteudo = [];

stream.pipe(csvParser()).on("data", (varData) => {
    conteudo.push({
        id: conteudo.length + 1,
        city: varData["city"].trim(),
        area: Number(varData["area"].replace(",",".")),
        rooms: Number(varData["rooms"].replace(",",".")),
        bathroom: Number(varData["bathroom"].replace(",",".")),
        "parking spaces": Number(varData["parking spaces"].replace(",",".")),
        floor: varData["floor"],
        animal: Boolean(varData["animal"]),
        furniture: Boolean(varData["furniture"]),
        "rent amount": Number(varData["rent amount"].replace(",",".")) * 100,
        "property tax": Number(varData["property tax"].replace(",",".")) * 100,
        "fire insurance": Number(varData["fire insurance"].replace(",",".")) * 100,
        total: Number(varData["total"].replace(",",".")) * 100
    });
});

stream.on("end", () => {    
    const csvWriter = createCsvWriter({
    path: 'houses_out.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'city', title: 'cidade'},
        {id: 'area', title: 'area'},
        {id: 'rooms', title: 'quantidade_quartos'},
        {id: 'bathroom', title: 'quantidade_banheiros'},
        {id: 'parking spaces', title: 'quantidade_vagas'},
        {id: 'floor', title: 'andar'},
        {id: 'animal', title: 'permitido_animal'},
        {id: 'furniture', title: 'mobiliado'},
        {id: 'rent amount', title: 'aluguel'},
        {id: 'property tax', title: 'imposto_imovel'},
        {id: 'fire insurance', title: 'seguro_fogo'},
        {id: 'total', title: 'total'}
    ]
    });
    csvWriter.writeRecords(conteudo)
});