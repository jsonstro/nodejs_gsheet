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
          date: row[''], //a
          deck_sn: row[1],
          motor_sn_l: row[2],
          motor_sn_r: row[3], //d
          motor_failure_code: row[4],
          motor_comments: row[5],
          motor_qa_sign_off: row[6],
          ma1_date: row[7],
          bcu_version: row[8], //i
          fw_version: row[9],
          main_board_sn: row[10],
          ma_failure_code: row[11],
          ma_comments: row[12],
          ma_qa_sign_off: row[13],
          pkg_date: row[14], //o
          remote_sn: row[15],
          battery_sn: row[16],
          battery_failure_code: row[17],
          battery_comments: row[18],
          battery_qa_sign_off: row[19],
          rflx_date: row[20], //u
          pcba_sn: row[21],
          external_sn: row[22],
          rflx_failure_code: row[23],
          rflx_comments: row[24],
          rflx_qa_sign_off: row[25],
          last_gdoc_row_id: rows.length,
          created_by: "inboard",
        }
        //console.log(resultObj);
        Data.create(resultObj)
          .then(rush => res.status(201).send(rush))
          .catch(err => console.error(err))
      })
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
          .then(rush => res.status(201).send(rush))
          .catch(err => console.error(err))
      })
    }

    input.pipe(parser).pipe(transform)
  }
}
