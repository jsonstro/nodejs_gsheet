const Deck = require('../models').Data;

module.exports = {
  create(req, res) {
    return Deck
      .create({
        deck_sn: req.body.deck_sn,
        created_by: "inboard", //req.body.created_by,
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
};
