const Deck = require('../models').Data;
const importGsh = require('../../import_gsheet');
const importCsv = require('../../import_csv');

module.exports = {
  create(req, res) {
    return Deck
      .create({
        deck_sn: req.body.deck_sn,
        last_gdoc_row_id: req.body.last_gdoc_row_id,
        date: req.body.date,
        motor_sn_l: req.body.motor_sn_l,
        motor_sn_r: req.body.motor_sn_r,
        bcu_version: req.body.bcu_version,
        fw_version: req.body.fw_version,
        main_board_sn: req.body.main_board_sn,
        pkg_date: req.body.pkg_date,
        remote_sn: req.body.remote_sn,
        battery_sn: req.body.battery_sn,
        rflx_date: req.body.rflx_date,
        pcba_sn: req.body.pcba_sn,
        external_sn: req.body.external_sn,
        created_by: "inboard",
        //created_by: req.body.created_by,
      })
      .then(deck => res.status(201).send(deck))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Deck
      .all()
      .then(deck => res.status(200).send(deck))
      .catch(error => res.status(400).send(error));
  },
  countAll(req, res) {
    return Deck
      .findAndCountAll()
      .then(deck => res.status(200).send(deck.count))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Deck
      .findAll({
        where: {
          deck_sn: req.params.deck_sn
        }
      })
      .then(deck => {
        if (!deck) {
          return res.status(404).send({
            message: 'Deck SN Not Found in Data Table',
          });
        }
        return res.status(200).send(deck);
      })
      .catch(error => res.status(400).send(error));
  },
  fetch(req, res) {
    return Deck
      .findAll({
        where: {
          deck_sn: req.body.deck_sn
        }
      })
      .then(deck => {
        if (!deck) {
          return res.status(404).send({
            message: 'Deck SN Not Found in Data Table',
          });
        }
        return res.status(200).send(deck);
      })
      .catch(error => res.status(400).send(error));
  },
  // Daily API import of mfg gSheet
  gshImport(req, res) {
    importGsh.importRows(req.body.type);
  },
  // Pre-2018 mfg data
  csvImport(req, res) {
    importCsv.Import(req.body.csv_name);
  },
};
