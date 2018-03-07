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
};
