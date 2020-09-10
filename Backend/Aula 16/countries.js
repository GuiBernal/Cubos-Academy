const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const stream = fs.createReadStream('countries.csv');
let conteudo = [];

stream.pipe(csvParser()).on('data', (varData) => {
    conteudo.push({
        id: conteudo.length + 1,
        Country: varData['Country'].trim(),
        Region: varData['Region'].trim(),
        Population: Number(varData['Population']),
        'Area (sq. mi.)': Number(varData['Area (sq. mi.)'].replace(',','.')),
        'Pop. Density (per sq. mi.)': Number(varData['Pop. Density (per sq. mi.)'].replace(',','.')),
        'Coastline (coast/area ratio)': Number(varData['Coastline (coast/area ratio)'].replace(',','.')),
        'Net migration': Number(varData['Net migration'].replace(',','.')),
        'Infant mortality (per 1000 births)': Number(varData['Infant mortality (per 1000 births)'].replace(',','.')),
        'GDP ($ per capita)': Number(varData['GDP ($ per capita)'].replace(',','.')),
        'Literacy (%)': Number(varData['Literacy (%)'].replace(',','.')),
        'Phones (per 1000)': Number(varData['Phones (per 1000)'].replace(',','.')),
        'Arable (%)': Number(varData['Arable (%)'].replace(',','.')),
        'Crops (%)': Number(varData['Crops (%)'].replace(',','.')),
        'Other (%)': Number(varData['Other (%)'].replace(',','.')),
        Climate: Number(varData['Climate'].replace(',','.')),
        Birthrate: Number(varData['Birthrate'].replace(',','.')),
        Deathrate: Number(varData['Deathrate'].replace(',','.')),
        Agriculture: Number(varData['Agriculture'].replace(',','.')),
        Industry: Number(varData['Industry'].replace(',','.')),
        Service: Number(varData['Service'].replace(',','.'))
    });
});

stream.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'countries_out.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'Country', title: 'pais'},
            {id: 'Region', title: 'regiao'},
            {id: 'Population', title: 'populacao'},
            {id: 'Area (sq. mi.)', title: 'area'},
            {id: 'Pop. Density (per sq. mi.)', title: 'densidade_populacional'},
            {id: 'Coastline (coast/area ratio)', title: 'area_costeira'},
            {id: 'Net migration', title: 'taxa_migratoria'},
            {id: 'Infant mortality (per 1000 births)', title: 'mortalidade_infantil'},
            {id: 'GDP ($ per capita)', title: 'pib'},
            {id: 'Literacy (%)', title: 'alfabetizacao'},
            {id: 'Phones (per 1000)', title: 'telefonia_movel'},
            {id: 'Arable (%)', title: 'area_aravel'},
            {id: 'Crops (%)', title: 'area_cultivo'},
            {id: 'Other (%)', title: 'outros'},
            {id: 'Climate', title: 'clima'},
            {id: 'Birthrate', title: 'taxa_nascimente'},
            {id: 'Deathrate', title: 'taxa_mortalidade'},
            {id: 'Agriculture', title: 'agricultura_porcentagem'},
            {id: 'Industry', title: 'industria_porcentagem'},
            {id: 'Service', title: 'servico_porcentagem'}
        ]
    });
    csvWriter.writeRecords(conteudo)
});

  