const fs = require('fs');
const csv = require('csv');
const Rush = require('./server/models').RushOrders

module.exports = {
  Import(file) {
    // const file = rush_test.csv
    const input = fs.createReadStream('./csv/'+file);
    const parser = csv.parse({
      relax: true,
      delimiter: ',',
      skip_empty_lines: false, 
      auto_parse: true, 
      columns: true,
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
        item: row['item'],
        qty_order: row['qty_order'],
        qty_fulfil: row['qty_fulill'],
        partialful: row['partialful'],
        fully_full: row['fully_full'],
        alternateid: row['alternateid'],
        created_by: "inboard",
      }
      //console.log(resultObj);
      Rush.create(resultObj)
        .then(rush => res.status(201).send(rush))
        //.catch(err => res.status(400).send(err))
        .catch(err => console.error(err))
    })
    
    input.pipe(parser).pipe(transform)
  }
}
