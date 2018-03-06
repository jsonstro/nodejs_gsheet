const dataController = require('../controllers').data;
const userController = require('../controllers').user;
const rushController = require('../controllers').rush;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the InBoard Customer Service API!',
  }));

  app.post('/api/data', dataController.create);
  app.post('/api/user', userController.create);
  app.post('/api/rush', rushController.create);

  app.get('/api/data', dataController.list);
  app.get('/api/user', userController.list);
  app.get('/api/rush', rushController.list);
};
