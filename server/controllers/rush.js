const Rush = require('../models').RushOrders;
const importCsv = require('../../import_csv');

module.exports = {
  create(req, res) {
    return Rush
      .create({
        deck_sn: req.body.deck_sn,
        ordernum: req.body.ordernum,
        internalid: req.body.internalid,
        sales_ord: req.body.sales_ord,
        shipvia: req.body.shipvia,
        weight: req.body.weight,
        trackingnu: req.body.trackingnu,
        shipdate: req.body.shipdate,
        item: req.body.item,
        qty_order: req.body.qty_order,
        qty_fulfil: req.body.qty_fulill,
        partialful: req.body.partialful,
        fully_full: req.body.fully_full,
        alternateid: req.body.alternateid,
        created_by: "inboard", 
        //created_by: req.body.created_by,
      })
      .then(rush => res.status(201).send(rush))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Rush
      .all()
      .then(rush => res.status(200).send(rush))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Rush
      .findAll({
        where: {
          deck_sn: req.params.deck_sn
        }
      })
      .then(rush => {
        if (!rush) {
          return res.status(404).send({
            message: 'Deck SN Not Found in Rush Table',
          });
        }
        return res.status(200).send(rush);
      })
      .catch(error => res.status(400).send(error));
  },
  fetch(req, res) {
    return Rush
      .findAll({
        where: {
          deck_sn: req.body.deck_sn
        }
      })
      .then(rush => {
        if (!rush) {
          return res.status(404).send({
            message: 'Deck SN Not Found in Rush Table',
          });
        }
        return res.status(200).send(rush);
      })
      .catch(error => res.status(400).send(error));
  },
  csvupImport(req) {
    const data = req.body.data;
    const filename = req.body.filename;
   
    console.log(data.index('base64'));
    const data_index = data.index('base64') + 7;
    const filedata = data.slice(data_index, data.length);
    const decoded_image = Base64.decode64(filedata);
     
    const file = File.new("./csv/#{filename}", "w+");
    file.write(decoded_image)
    .then(importCsv.Import("./csv/#{filename}"));
  },
  csvImport(req) {
    importCsv.Import(req.body.csv_name);
  },
};
