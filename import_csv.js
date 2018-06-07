const fs = require('fs');
const csv = require('csv');
const Rush = require('./server/models').RushOrders
const Data = require('./server/models').Data

module.exports = {
  Import(file) {
    const input = fs.createReadStream('./csv/'+file);
    if (file == "2017_mfg_data.csv" || file == "2016-18_mfg_data.csv") {
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
          motor_failure_code: row['Motor Failure Code'],
          motor_comments: row['Motor Comments'],
          //motor_qa_sign_off: row[''],
          ma1_date: row['MA1 Date'],
          bcu_version: row['BCU Version'], //i
          fw_version: row['FW Version'],
          main_board_sn: row['Main Board S/N'],
          ma_failure_code: row['MA Failure Code'],
          ma_comments: row['MA Comments'],
          //ma_qa_sign_off: row[''],
          pkg_date: row['PKG Date'], //o
          remote_sn: row['Remote S/N'],
          battery_sn: row['Battery S/N'],
          battery_failure_code: row['Failure Codes'],
          battery_comments: row['Battery Comments'],
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
        console.log("yes");
      const transform = csv.transform(row => {
        const resultObj = {
          deck_sn: row['serial'],
          ordernum: row['order'],
          internalid: row['internetid'],
          spc_code: row['spc_code'],
          inpart: row['inpart'],
          trackingnu: row['tracking'],
          shipdate: row['inv_date'],
          item: row['item'],
          alternateid: row['alt_order'],
          firstname: row['firstname'],
          lastname: row['lastname'],
          company: row['company'],
          addr: row['addr'],
          addr2: row['addr2'],
          city: row['city'],
          state: row['state'],
          zipcode: row['zipcode'],
          cntry: row['cntry'],
          phone: row['phone'],
          email: row['email'],
          ship_first: row['ship_first'],
          ship_last: row['ship_last'],
          ship_co: row['ship_co'],
          ship_addr: row['ship_addr'],
          ship_addr2: row['ship_addr2'],
          ship_city: row['ship_city'],
          ship_st: row['ship_st'],
          ship_zip: row['ship_zip'],
          ship_ctry: row['ship_ctry'],
          created_by: "inboard",
        }
        //console.log(resultObj);
        Rush.create(resultObj)
          //.then(rush => res.status(201).send(rush))
          .catch(err => {
            //console.log("--> Row SN: "+row['serial']);
            fs.appendFile('rush_error.log', JSON.stringify(err.name)+": "+JSON.stringify(err.errors)+"\n", (e) => {}
            );
            console.error(err);
          })
      })
      input.pipe(parser).pipe(transform)
    }

  }
}
