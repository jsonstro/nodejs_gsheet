const fs = require('fs');
const csv = require('csv');
const Rush = require('./server/models').RushOrders
const Data = require('./server/models').Data

module.exports = {
  Import(file) {
    const input = fs.createReadStream('./csv/'+file);
    if (file == "2017_mfg_data.csv") {
      // Import the pre-2018 mfg data from a ';' delimited, mapped CSV
      // 2017 mfg csv name is set in 'server/views/home.hbs'
      const parser = csv.parse({
        relax: true,
        delimiter: ';',
        skip_empty_lines: false, 
        auto_parse: true, 
        columns: true,
      })
      const transform = csv.transform(row => {
        const resultObj = {
          date: row['-'], //a
          deck_sn: row['Deck SN'],
          motor_sn_l: row['Motor S/N (L)'],
          motor_sn_r: row['Motor S/N (R)'], //d
          //motor_failure_code: row[''],
          motor_comments: row['Comments'],
          //motor_qa_sign_off: row[''],
          // ma1_date: row['MA1 Date'],
          //bcu_version: row[''], //i
          fw_version: row['FW'],
          main_board_sn: row['Main Board S/N'],
          //ma_failure_code: row[''],
          //ma_comments: row[''],
          //ma_qa_sign_off: row[''],
          // pkg_date: row['PKG Date'], //o
          remote_sn: row['Remote S/N'],
          battery_sn: row['Battery S/N'],
          //battery_failure_code: row[''],
          //battery_comments: row[''],
          //battery_qa_sign_off: row[''],
          //rflx_date: row[''], //u
          //pcba_sn: row[''],
          //external_sn: row[''],
          //rflx_failure_code: row[''],
          //rflx_comments: row[''],
          //rflx_qa_sign_off: row[''],
          last_gdoc_row_id: 0,
          created_by: "inboard",
        }
        //console.log(resultObj);
        Data.create(resultObj)
          //.then(deck => res.status(201).send(deck))
          .catch(err => {
            //console.log("--> Row SN: "+row['Deck SN']);
            fs.appendFile('data_error.log', JSON.stringify(err.name)+": "+JSON.stringify(err.errors)+"\n", (e) => {} 
            );
            //console.error(err);
          })
      })
      input.pipe(parser).pipe(transform);
    } else {
      // Rush data model import of monthly CSV
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
        Rush.create(resultObj)
          //.then(rush => res.status(201).send(rush))
          .catch(err => {
            //console.log("--> Row SN: "+row['serial']);
            fs.appendFile('rush_error.log', JSON.stringify(err.name)+": "+JSON.stringify(err.errors)+"\n", (e) => {}
            );
            //console.error(err);
          })
      })
      input.pipe(parser).pipe(transform)
    }

  }
}
