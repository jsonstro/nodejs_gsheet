const Version = require('../models').Versions;
const Fw = require('../models').FWs
const Bcu = require('../models').BCUs;

module.exports = {
  create(req, res) {
    return Version
      .create({
        id: req.body.id, 
        bcu_version: req.body.bcu_version, 
        fw_version: req.body.fw_version, 
        date_changed: req.body.date_changed, 
        created_by: "inboard",
        //created_by: req.body.created_by,
      })
      .then(version => res.status(201).send(version))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Version
      .all()
      .then(version => res.status(200).send(version))
      .catch(error => res.status(400).send(error));
  },
  createFw(req, res) {
    return Fw
      .create({
        id: req.body.id, 
        fw_version: req.body.fw_version, 
      })
      .then(fw => res.status(201).send(fw))
      .catch(error => res.status(400).send(error));
  },
  listFw(req, res) {
    return Fw
      .all()
      .then(fw => res.status(200).send(fw))
      .catch(error => res.status(400).send(error));
  },
  createBcu(req, res) {
    return Bcu
      .create({
        id: req.body.id, 
        bcu_version: req.body.bcu_version, 
      })
      .then(fw => res.status(201).send(fw))
      .catch(error => res.status(400).send(error));
  },
  listBcu(req, res) {
    return Bcu
      .all()
      .then(bcu => res.status(200).send(bcu))
      .catch(error => res.status(400).send(error));
  },
};
