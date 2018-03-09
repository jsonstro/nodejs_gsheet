const Version = require('../models').Versions;

module.exports = {
  create(req, res) {
    return Version
      .create({
        id: req.body.id, 
        bcu_version: req.body.bcu_version, 
        fw_version: req.body.fw_version, 
        date_changed: req.body.date_changed, 
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
};
