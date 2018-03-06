const Rush = require('../models').RushOrders;

module.exports = {
  create(req, res) {
    return Rush
      .create({
        deck_sn: req.body.deck_sn,
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
};
