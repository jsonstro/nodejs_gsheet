const dataController = require('../controllers').data;
const userController = require('../controllers').user;
const rushController = require('../controllers').rush;
const versController = require('../controllers').vers;

module.exports = (app) => {
  app.get('/', (req, res) => {  
    res.render('home', {})
  })

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the InBoard Customer Service API!',
  }));

  app.post('/api/data', dataController.create);
  app.post('/api/user', userController.create);
  app.post('/api/rush', rushController.create);
  app.post('/api/version', versController.create);
  app.post('/api/fw', versController.createFw);
  app.post('/api/bcu', versController.createBcu);

  app.get('/api/data', dataController.list);
  app.get('/api/user', userController.list);
  app.get('/api/rush', rushController.list);
  app.get('/api/version', versController.list);
  app.get('/api/fw', versController.listFw);
  app.get('/api/bcu', versController.listBcu);

  app.get('/api/rush/:deck_sn', rushController.retrieve);
  app.get('/api/data/:deck_sn', dataController.retrieve);

  app.post('/api/form_r', rushController.fetch);
  app.post('/api/form_d', dataController.fetch);

  app.post('/api/import_r', rushController.csvImport);
  app.post('/api/upport_r', rushController.csvUpport);
  app.post('/api/import_d', dataController.gshImport);
  app.post('/api/import_p', dataController.csvImport);
};
