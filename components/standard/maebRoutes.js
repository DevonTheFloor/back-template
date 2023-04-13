const express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  maebCtrlrs = require('./maebController');

router
  .get('/getone/:id', maebCtrlrs.getOne)
  .get('/getall-in-city/:zip', maebCtrlrs.getAllInCity)
  .post('/postone/',multer, maebCtrlrs.createOne)
  .post('/search-maeb/', multer, maebCtrlrs.getRecherche)
  .get('/deleteone/:id', maebCtrlrs.deleteOne);

  
module.exports = router;