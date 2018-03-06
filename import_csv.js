const fs = require('fs');
const csv = require('csv');
//const Device = require('./models').Device

const input = fs.createReadStream('test.csv');
const parser = csv.parse({
  delimiter: ',',
  columns: true
})

const transform = csv.transform(row => {
  const resultObj = {
    deck_sn: row['serial'],
    ordernum: row['ordernum'],
    internalid: row['internalid'],
    sales_ord: row['sales_ord'],
    shipvia: row['shipvia'],
    weight: row['weight'],
    trackingnu: row['trackingnu'],
    shipdate: row['shipdate'],
    item: row['item'] ,
    qty_order: row['qty_order'],
    qty_fulfil: row['qty_fulill'],
    partialful: row['partialful'],
    fully_full: row['fully_full'],
    alternateid: row['alternateid'],
    created_by: "inboard",
    //created_by: row[''].slice(2, 4),
  }
  Rush.create(resultObj)
    .then(rush => res.status(201).send(rush))
    //function() {
    //    console.log('Record created')
    //})
    .catch(function(err) {
      console.log('Error encountered: ' + err)
    })
})

input.pipe(parser).pipe(transform)
