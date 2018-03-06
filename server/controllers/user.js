const User = require('../models').Users;

module.exports = {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        type: req.body.type,
        passwd: req.body.passwd,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User
      .all()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
};
